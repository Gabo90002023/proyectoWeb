"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, ImageIcon, Type, X, Check } from "lucide-react"
import { Droppable, Draggable } from "@hello-pangea/dnd"

import "./ElementsPanel.css"

export default function ElementsPanel({ items, onAddItem, onUpdateItem, onDeleteItem }) {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItemId, setEditingItemId] = useState(null)
  const [newItemType, setNewItemType] = useState("text")
  const [newItemContent, setNewItemContent] = useState("")
  const [newItemImageUrl, setNewItemImageUrl] = useState("")
  const [newItemExplanation, setNewItemExplanation] = useState("")
  const fileInputRef = useRef(null)

  /* ---------- helpers ---------- */
  const handleFileUpload = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("El archivo seleccionado no es una imagen válida.");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const img = new Image();

    img.onload = () => {
      const MAX_WIDTH = 300;
      const MAX_HEIGHT = 300;
      let { width, height } = img;

      // Redimensionar manteniendo proporción
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // Canvas para redibujar y comprimir
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Exportar comprimido (PNG calidad 0.8)
      const compressedDataUrl = canvas.toDataURL("image/png", 0.8);

      // 👉 Solo actualiza el estado local; se guardará al pulsar “Guardar”
      setNewItemImageUrl(compressedDataUrl);
    };

    img.onerror = () => alert("Error al procesar la imagen.");
    img.src = event.target?.result;
  };

  reader.onerror = () => alert("Error al leer el archivo.");
  reader.readAsDataURL(file);
};



  const resetForm = () => {
    setNewItemContent("")
    setNewItemImageUrl("")
    setNewItemExplanation("")
    setIsAddingItem(false)
    setEditingItemId(null)
  }

  const handleAddItem = () => {
  if (
    (newItemType === "text" && !newItemContent.trim()) ||
    (newItemType === "image" && !newItemImageUrl.trim()) ||
    (newItemType === "both" && (!newItemContent.trim() || !newItemImageUrl.trim()))
  ) {
    return
  }

  const item = {
    id: Date.now().toString(),
    content:
      newItemType === "image" ? "" : newItemContent.trim(), // solo imagen → sin texto
    imageUrl:
      newItemType === "text" ? "" : newItemImageUrl.trim(), // solo texto → sin imagen
    explanation: newItemExplanation.trim(),
  }

  onAddItem(item)
  resetForm()
}


  const startEditing = (item) => {
    setEditingItemId(item.id)
    setNewItemContent(item.content || "")
    setNewItemImageUrl(item.imageUrl || "")
    setNewItemExplanation(item.explanation || "")

    /* determinar tipo */
    if (item.imageUrl && item.content && item.content !== "Imagen") setNewItemType("both")
    else if (item.imageUrl) setNewItemType("image")
    else setNewItemType("text")
  }

const saveEdit = () => {
  if (!editingItemId) return

  const updatedItem = {
    id: editingItemId,
    content:
      newItemType === "image" ? "" : newItemContent.trim(),
    imageUrl:
      newItemType === "text" ? "" : newItemImageUrl.trim(),
    explanation: newItemExplanation.trim(),
  }

  onUpdateItem(editingItemId, null, updatedItem)
  resetForm()
}


  /* ---------- JSX ---------- */
  return (
    <div className="ep-container">
      {/* Encabezado */}
      <div className="ep-header">
        <h2 className="ep-title">Elementos de la secuencia</h2>
        <Button onClick={() => setIsAddingItem(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus size={16} className="mr-2" />
          Agregar elemento
        </Button>
      </div>

      {/* Formulario Add / Edit */}
      {(isAddingItem || editingItemId) && (
        <div className="ep-form">
          <h3>{editingItemId ? "Editar elemento" : "Agregar nuevo elemento"}</h3>

          {/* Botones de tipo */}
          <div className="ep-type-buttons">
            {["text", "image", "both"].map((type) => (
              <Button
                key={type}
                size="sm"
                onClick={() => setNewItemType(type)}
                variant={newItemType === type ? "default" : "outline"}
                className={
                  newItemType === type
                    ? "bg-blue-600 text-white"
                    : "border-blue-400/30 text-slate-300 hover:bg-slate-600"
                }
              >
                {type === "text" && <Type size={14} />}
                {type === "image" && <ImageIcon size={14} />}
                {type === "both" && (
                  <>
                    <ImageIcon size={14} />
                    <Type size={14} />
                  </>
                )}
                {type === "text"
                  ? "Solo texto"
                  : type === "image"
                  ? "Solo imagen"
                  : "Imagen + texto"}
              </Button>
            ))}
          </div>

          {/* Campo texto */}
          {(newItemType === "text" || newItemType === "both") && (
            <div>
              <Label className="block text-sm mb-1 text-slate-200">Texto del elemento</Label>
              <Input
                value={newItemContent}
                onChange={(e) => setNewItemContent(e.target.value)}
                placeholder="Nombre o descripción"
                className="bg-slate-800 border-blue-400/30 text-slate-100 placeholder:text-slate-400"
              />
            </div>
          )}

          {/* Imagen */}
          {(newItemType === "image" || newItemType === "both") && (
            <>
              <div>
                <Label className="block text-sm mb-1 text-slate-200">Subir imagen</Label>
                <Input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, !!editingItemId, editingItemId)}
                  className="bg-slate-800 border-blue-400/30 text-slate-100"
                />
              </div>
              <div>
                <Label className="block text-sm mb-1 text-slate-200">URL de imagen</Label>
                <Input
                  value={newItemImageUrl}
                  onChange={(e) => setNewItemImageUrl(e.target.value)}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="bg-slate-800 border-blue-400/30 text-slate-100 placeholder:text-slate-400"
                />
              </div>
            </>
          )}

          {/* Explicación */}
          <div>
            <Label className="block text-sm mb-1 text-slate-200">Explicación del elemento</Label>
            <Textarea
              value={newItemExplanation}
              onChange={(e) => setNewItemExplanation(e.target.value)}
              placeholder="Explicación de este elemento"
              rows={2}
              className="bg-slate-800 border-blue-400/30 text-slate-100 placeholder:text-slate-400"
            />
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <Button
              onClick={editingItemId ? saveEdit : handleAddItem}
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900"
            >
              <Check size={16} className="mr-2" />
              {editingItemId ? "Guardar" : "Agregar"}
            </Button>
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-blue-400/30 text-slate-300 hover:bg-slate-600"
            >
              <X size={16} className="mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* GRID de ítems */}
      <Droppable droppableId="elements-panel">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`ep-grid ${snapshot.isDraggedOver ? "is-over" : ""}`}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`ep-item ${snapshot.isDragging ? "dragging" : ""}`}
                  >
                    {/* Botones acción */}
                    <div className="ep-item-actions">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          startEditing(item)
                        }}
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400"
                      >
                        <Edit size={12} />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteItem(item.id)
                        }}
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 bg-red-500/20 hover:bg-red-500/40 text-red-400"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>

                    {/* Contenido */}
                    {/* Mostrar imagen si existe */}
                    {item.imageUrl && (
                    <img
                        src={item.imageUrl}
                        alt={item.content || "Imagen"}
                        className="max-w-full max-h-16 object-contain mb-2"
                    />
                    )}
                    {/* Mostrar texto solo si no es tipo 'solo imagen' */}
                    {item.content?.trim() !== "" && (
                      <span className="text-xs text-center text-slate-100 font-medium leading-tight">
                        {item.content}
                      </span>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
