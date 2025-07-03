"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import ElementsPanel from "./ElementsPanel"
import SequenceEditor from "./SequenceEditor"
import { DragDropContext } from "@hello-pangea/dnd"
import SummernoteEditor from "../../../components/editor/SummernoteEditor"

import "./QuestionEditor.css"

export default function QuestionEditor({ question, onSave, onCancel }) {
  const [title, setTitle] = useState(question?.title || "")
  const [category, setCategory] = useState(question?.category || "")
  const [instructions, setInstructions] = useState(question?.instructions || "")
  const [questionText, setQuestionText] = useState(question?.question || "")
  const [generalExplanation, setGeneralExplanation] = useState(question?.generalExplanation || "")
  const [items, setItems] = useState(question?.items || [])
  const [sequences, setSequences] = useState(question?.sequences || [])

  /* ---------- helpers para ítems y secuencias ---------- */
  const addNewItem = (newItem) => setItems([...items, newItem])

 const updateItem = (id, field, value) => {
  setItems(items.map((it) => {
    if (it.id !== id) return it

    if (field === null && typeof value === "object") {
      return { ...it, ...value } // Actualización múltiple
    } else {
      return { ...it, [field]: value }
    }
  }))
}

  const deleteItem = (itemId) => {
    setItems(items.filter((it) => it.id !== itemId))
    setSequences(
      sequences.map((seq) => ({ ...seq, items: seq.items.filter((id) => id !== itemId) }))
    )
  }

  const addSequence = () =>
    setSequences([
      ...sequences,
      {
        id: `seq${Date.now()}`,
        name: `Secuencia ${sequences.length + 1}`,
        items: [],
        explanation: "",
      },
    ])

  const removeSequence = (sequenceId) =>
    setSequences(sequences.filter((seq) => seq.id !== sequenceId))

  const removeItemFromSequence = (sequenceId, itemIndex) =>
    setSequences(
      sequences.map((seq) =>
        seq.id === sequenceId
          ? { ...seq, items: seq.items.filter((_, idx) => idx !== itemIndex) }
          : seq
      )
    )

  /* ---------- drag-and-drop ---------- */
  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return

    /* Panel → Secuencia */
    if (source.droppableId === "elements-panel" && destination.droppableId.startsWith("sequence-")) {
      const sequenceId = destination.droppableId.replace("sequence-", "")
      const item = items[source.index]

      setSequences(
        sequences.map((seq) =>
          seq.id === sequenceId && !seq.items.includes(item.id)
            ? {
                ...seq,
                items: [
                  ...seq.items.slice(0, destination.index),
                  item.id,
                  ...seq.items.slice(destination.index),
                ],
              }
            : seq
        )
      )
    }

    /* Dentro de la misma secuencia */
    if (
      source.droppableId.startsWith("sequence-") &&
      destination.droppableId === source.droppableId
    ) {
      const seqId = source.droppableId.replace("sequence-", "")
      setSequences(
        sequences.map((seq) => {
          if (seq.id !== seqId) return seq
          const newItems = [...seq.items]
          const [moved] = newItems.splice(source.index, 1)
          newItems.splice(destination.index, 0, moved)
          return { ...seq, items: newItems }
        })
      )
    }
  }

  /* ---------- guardar ---------- */
  const handleSave = () => {
    if (!title.trim()) return

    const data = {
      id: question?.id,
      title,
      category,
      instructions,
      question: questionText,
      generalExplanation,
      items,
      sequences,
    }
    onSave(data) // <- Aquí se dispara todo hacia el backend
  }

  /* ---------- JSX ---------- */
  return (
    <div className="question-editor-container">
      {/* Encabezado */}
      <div className="question-editor-header">
        <div className="question-editor-header-inner">
          <h1 className="question-editor-title">Editar pregunta</h1>

          <div className="question-editor-header-actions">
            <Button
              onClick={handleSave}
              disabled={!title.trim() || items.length === 0 || sequences.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="question-editor-content">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="question-editor-grid">
            {/* Columna izquierda */}
            <div className="question-editor-left">
              {/* Formulario de la pregunta */}
              <div className="question-editor-form">
                {/* Título */}
                <div>
                  <Label htmlFor="title" className="text-slate-200 text-sm">
                    Título de la pregunta
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ordena la secuencia de cocinar un huevo"
                    className="bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400 mt-1"
                  />
                </div>

                {/* Categoria edad*/}
                <div>
                  <Label htmlFor="category" className="text-slate-200 text-sm">
                    Categoria de edad
                  </Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select-category22"
                  >
                    <option value="">Selecciona un grupo...</option>
                    <option value="Kits">Kits (edad 6-8)</option>
                    <option value="Ruedas">Ruedas (8-10 años)</option>
                    <option value="Benjamines">Benjamines (edad 10-12)</option>
                    <option value="Cadetes">Cadetes (12-14 años)</option>
                    <option value="Juniors">Juniors (edades 14-16)</option>
                    <option value="Personas mayores">Personas mayores (16 a 18 años)</option>
                  </select>
                </div>

                {/* Instrucciones */}
                <div>
                  <Label className="text-slate-200">Instrucciones</Label>
                  <SummernoteEditor value={instructions} onChange={(html) => setInstructions(html)} />
                </div>

                {/* Pregunta */}
                <div>
                  <Label className="text-slate-200">Pregunta</Label>
                  <SummernoteEditor value={questionText} onChange={(html) => setQuestionText(html)} />
                </div>

                {/* Explicación general */}
                <div>
                  <Label className="text-slate-200">Explicación</Label>
                  <SummernoteEditor value={generalExplanation} onChange={(html) => setGeneralExplanation(html)} />
                </div>
              </div>

              {/* Editor de Secuencias */}
              <SequenceEditor
                sequences={sequences}
                items={items}
                onUpdateSequences={setSequences}
                onAddSequence={addSequence}
                onRemoveSequence={removeSequence}
                onRemoveItemFromSequence={removeItemFromSequence}
              />
            </div>

            {/* Columna derecha: Panel de elementos */}
            <ElementsPanel
              items={items}
              onAddItem={addNewItem}
              onUpdateItem={updateItem}
              onDeleteItem={deleteItem}
            />
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}
