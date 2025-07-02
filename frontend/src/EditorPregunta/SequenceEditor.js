"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, ArrowRight } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"

import "./SequenceEditor.css"

export default function SequenceEditor({
  sequences,
  items,
  onUpdateSequences,
  onAddSequence,
  onRemoveSequence,
  onRemoveItemFromSequence,
}) {
  const [activeSequence, setActiveSequence] = useState(0)

  /* ---------- helpers ---------- */
  const addNewSequence = () => {
    const newSequence = {
      id: `seq${Date.now()}`,
      name: `Secuencia ${sequences.length + 1}`,
      items: [],
      explanation: "",
    }
    onUpdateSequences([...sequences, newSequence])
    setActiveSequence(sequences.length)
  }

  const removeSequence = (index) => {
    onRemoveSequence(sequences[index].id)
    if (activeSequence >= sequences.length - 1) setActiveSequence(Math.max(0, sequences.length - 2))
  }

  const updateSequence = (index, field, value) => {
    const newSeqs = [...sequences]
    newSeqs[index] = { ...newSeqs[index], [field]: value }
    onUpdateSequences(newSeqs)
  }

  /* ---------- drag-and-drop ---------- */
  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return
    const seqIdx = activeSequence
    const current = sequences[seqIdx]

    /* dentro de la misma área */
    if (source.droppableId === destination.droppableId && source.droppableId === "sequence-area") {
      const newItems = [...current.items]
      const [moved] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, moved)
      updateSequence(seqIdx, "items", newItems)
      return
    }

    /* panel → secuencia */
    if (source.droppableId === "available-items" && destination.droppableId === "sequence-area") {
      const item = getAvailableItems()[source.index]
      if (!current.items.includes(item.id)) {
        const newItems = [...current.items]
        newItems.splice(destination.index, 0, item.id)
        updateSequence(seqIdx, "items", newItems)
      }
      return
    }

    /* secuencia → panel */
    if (source.droppableId === "sequence-area" && destination.droppableId === "available-items") {
      const newItems = [...current.items]
      newItems.splice(source.index, 1)
      updateSequence(seqIdx, "items", newItems)
    }
  }

  const getItemById = (id) => items.find((it) => it.id === id)
  const getAvailableItems = () =>
    items.filter((it) => !sequences[activeSequence]?.items.includes(it.id))

  /* ---------- UI cuando no hay secuencias ---------- */
  if (sequences.length === 0) {
    return (
      <div className="se-container">
        <div className="se-header">
          <Label className="text-lg font-semibold text-slate-200">Secuencias correctas</Label>
          <Button onClick={addNewSequence} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar secuencia
          </Button>
        </div>

        <Card className="se-card p-8 text-center">
          <p className="text-slate-300 mb-4">No hay secuencias creadas</p>
          <Button onClick={addNewSequence} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Crear primera secuencia
          </Button>
        </Card>
      </div>
    )
  }

  /* ---------- UI con secuencias ---------- */
  return (
    <div className="se-container">
      {/* encabezado */}
      <div className="se-header">
        <Label className="text-lg font-semibold text-slate-200">Secuencias correctas</Label>
        <Button onClick={addNewSequence} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Agregar secuencia
        </Button>
      </div>

      {/* tabs */}
      <div className="se-tabs">
        {sequences.map((seq, idx) => (
          <div key={seq.id} style={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={() => setActiveSequence(idx)}
              variant={activeSequence === idx ? "default" : "outline"}
              className={
                activeSequence === idx
                  ? "bg-blue-600 text-white"
                  : "border-slate-500 text-slate-300 hover:bg-slate-600"
              }
            >
              {seq.name}
            </Button>
            {sequences.length > 1 && (
              <Button
                onClick={() => removeSequence(idx)}
                variant="outline"
                size="icon"
                className="ml-2 text-red-400 hover:text-red-300 border-red-400 hover:border-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* tarjeta de la secuencia activa */}
      <Card className="se-card">
        <CardHeader>
          <CardTitle className="text-slate-200">
            Editando: {sequences[activeSequence].name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* nombre y explicación */}
          <div>
            <Label className="text-slate-200">Nombre de la secuencia</Label>
            <Input
              value={sequences[activeSequence].name}
              onChange={(e) => updateSequence(activeSequence, "name", e.target.value)}
              className="bg-slate-600 border-slate-500 text-slate-100"
            />
          </div>

          <div>
            <Label className="text-slate-200">Explicación de esta secuencia</Label>
            <Textarea
              value={sequences[activeSequence].explanation}
              onChange={(e) => updateSequence(activeSequence, "explanation", e.target.value)}
              placeholder="Explica por qué esta secuencia es correcta"
              rows={2}
              className="bg-slate-600 border-slate-500 text-slate-100"
            />
          </div>

          {/* drag-and-drop */}
          <DragDropContext onDragEnd={handleDragEnd}>
            {/* área de secuencia */}
            <div>
              <Label className="text-slate-200 mb-2 block">Secuencia</Label>
              <p className="text-sm text-slate-400 mb-3">
                Arrastra elementos desde el panel derecho para crear tu secuencia
              </p>

              <Droppable droppableId="sequence-area" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`se-drop-area ${
                      snapshot.isDraggedOver ? "is-over" : ""
                    }`}
                  >
                    {sequences[activeSequence].items.length === 0 && !snapshot.isDraggedOver && (
                      <span className="text-slate-400 w-full text-center">
                        Arrastra elementos aquí para crear la secuencia
                      </span>
                    )}

                    {sequences[activeSequence].items.map((itemId, index) => {
                      const item = getItemById(itemId)
                      if (!item) return null
                        
                        const hasImg = item.imageUrl?.trim()
                        const hasTxt = item.content?.trim()
                      return (
                        <div key={`sequence-${itemId}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <Draggable draggableId={`sequence-${itemId}`} index={index}>
                            {(provided, snap) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`se-item ${snap.isDragging ? "dragging" : ""}`}
                              >
                                {/* Solo imagen */}
                                {hasImg && (!hasTxt || item.content === "Imagen") && (
                                <img
                                    src={item.imageUrl}
                                    alt="Elemento"
                                    className="w-full h-16 object-contain rounded"
                                />
                                )}

                                {/* Solo texto */}
                                {!hasImg && hasTxt && (
                                <span className="text-xs text-center text-slate-100 font-medium leading-tight">
                                    {item.content}
                                </span>
                                )}

                                {/* Imagen + texto */}
                                {hasImg && hasTxt && item.content !== "Imagen" && (
                                <>
                                    <img
                                    src={item.imageUrl}
                                    alt={item.content}
                                    className="w-full h-16 object-contain rounded mb-1"
                                    />
                                    <span className="text-xs text-center text-slate-100 font-medium leading-tight">
                                    {item.content}
                                    </span>
                                </>
                                )}
                              </div>
                            )}
                          </Draggable>

                          {/* badge + botón eliminar */}
                          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                            <span className="se-index-badge">{index + 1}</span>
                            <Button
                              onClick={() =>
                                onRemoveItemFromSequence(sequences[activeSequence].id, index)
                              }
                              variant="ghost"
                              size="icon"
                              className="w-6 h-6 text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={12} />
                            </Button>
                          </div>

                          {index < sequences[activeSequence].items.length - 1 && (
                            <ArrowRight className="text-blue-400 w-5 h-5" />
                          )}
                        </div>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* elementos disponibles */}
            <div>
              <Label className="text-slate-200 mb-2 block">Elementos disponibles</Label>
              <p className="text-sm text-slate-400 mb-3">
                Arrastra estos elementos a la secuencia
              </p>

              <Droppable droppableId="available-items" direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`se-drop-area available ${
                      snapshot.isDraggedOver ? "is-over" : ""
                    }`}
                  >
                    {getAvailableItems().length === 0 && !snapshot.isDraggedOver && (
                      <span className="text-slate-400 w-full text-center">
                        Todos los elementos están en uso
                      </span>
                    )}

                    {getAvailableItems().map((item, index) =>{

                    const hasImg = item.imageUrl?.trim()
                    const hasTxt = item.content?.trim()
                    return(
                      <Draggable key={`available-${item.id}`} draggableId={`available-${item.id}`} index={index}>
                        {(provided, snap) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`se-item ${snap.isDragging ? "dragging" : ""}`}
                          >
                            {/* Solo imagen */}
                            {hasImg && (!hasTxt || item.content === "Imagen") && (
                            <img
                                src={item.imageUrl}
                                alt="Elemento"
                                className="w-full h-16 object-contain rounded"
                            />
                            )}

                            {/* Solo texto */}
                            {!hasImg && hasTxt && (
                            <span className="text-xs font-medium text-slate-100 text-center leading-tight">
                                {item.content}
                            </span>
                            )}

                            {/* Imagen + texto */}
                            {hasImg && hasTxt && item.content !== "Imagen" && (
                            <>
                                <img
                                src={item.imageUrl}
                                alt={item.content}
                                className="w-full h-16 object-contain rounded mb-1"
                                />
                                <span className="text-xs font-medium text-slate-100 text-center leading-tight">
                                {item.content}
                                </span>
                            </>
                            )}

                          </div>
                        )}
                      </Draggable>
                    )})}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  )
}
