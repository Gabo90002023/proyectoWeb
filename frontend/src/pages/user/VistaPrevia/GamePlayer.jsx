"use client"

import { useState, useRef } from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ArrowRight, Check, X, BookOpen } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import ExplanationPanel from "./ExplanationPanel"

import "./GamePlayer.css"

export default function GamePlayer({ question, onBack }) {
  /* ---------- estado ---------- */
  const [userSequence, setUserSequence] = useState([])
  const [availableItems, setAvailableItems] = useState(() =>
    [...question.items].sort(() => Math.random() - 0.5)
  )
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const explanationRef = useRef(null)

  /* ---------- drag-and-drop ---------- */
  const handleDragEnd = ({ source, destination }) => {
    if (!destination) return

    /* mover dentro de la misma lista */
    if (source.droppableId === destination.droppableId) {
      const list = source.droppableId === "available-items" ? [...availableItems] : [...userSequence]
      const [moved] = list.splice(source.index, 1)
      list.splice(destination.index, 0, moved)
      source.droppableId === "available-items" ? setAvailableItems(list) : setUserSequence(list)
      return
    }

    /* available → sequence */
    if (source.droppableId === "available-items" && destination.droppableId === "user-sequence") {
      const item = availableItems[source.index]
      if (userSequence.find((it) => it.id === item.id)) return
      setAvailableItems((prev) => prev.filter((_, i) => i !== source.index))
      setUserSequence((prev) => {
        const newSeq = [...prev]
        newSeq.splice(destination.index, 0, item)
        return newSeq
      })
      return
    }

    /* sequence → available */
    if (source.droppableId === "user-sequence" && destination.droppableId === "available-items") {
      const item = userSequence[source.index]
      setUserSequence((prev) => prev.filter((_, i) => i !== source.index))
      setAvailableItems((prev) => {
        const newAvail = [...prev]
        newAvail.splice(destination.index, 0, item)
        return newAvail
      })
    }
  }

  /* ---------- validación ---------- */
  const checkAnswer = () => {
    const correct = question.sequences.some((seq) =>
      userSequence.length === seq.items.length &&
      userSequence.every((it, idx) => it.id === seq.items[idx])
    )
    setIsCorrect(correct)
    setIsSubmitted(true)
    setShowExplanation(true)
    // Scroll manual con offset
    setTimeout(() => {
      if (resultRef.current) {
        const yOffset = -100; // scroll 100px arriba del elemento
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50)
  }

  const resetGame = () => {
    setUserSequence([])
    setAvailableItems([...question.items].sort(() => Math.random() - 0.5))
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowExplanation(false)
  }

  const scrollToExplanation = () =>
    explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  const resultRef = useRef(null);

  /* ---------- JSX ---------- */
  return (
    <div className="gp-container">
      <div className="gp-inner">
        {/* banner de resultado */}
        {isSubmitted && (
          <div
            className={`gp-banner ${
              isCorrect
                ? "bg-emerald-500/20 border border-emerald-500/30"
                : "bg-red-500/20 border border-red-500/30"
            }`} ref={resultRef}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {isCorrect ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <X className="w-5 h-5 text-red-400" />
              )}
              <span className={isCorrect ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                {isCorrect ? "¡Tu respuesta es correcta!" : "Tu respuesta es incorrecta"}
              </span>
            </div>
            <Button onClick={scrollToExplanation} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Ver explicación
            </Button>

            {/* {!isCorrect && (
              <Button onClick={scrollToExplanation} className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Ver explicación
              </Button>
            )} */}
          </div>
        )}

        {/* encabezado */}
        <Card className="gp-card">
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                <CardTitle className="text-2xl text-blue-400">{question.title}</CardTitle>

                <div
                  className="text-slate-300"
                  dangerouslySetInnerHTML={{ __html: question.instructions }}
                ></div>

                {question.question && (
                  <div
                    className="text-yellow-400 font-medium"
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  ></div>
                )}



              </div>

              <div style={{ display: "flex", gap: ".5rem" }}>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar
                </Button>
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Volver
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* área de juego */}
        <div className="gp-game-area">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h3 className="text-lg font-medium text-slate-200">Ordena los elementos en la secuencia correcta</h3>
            <Button
              onClick={checkAnswer}
              disabled={userSequence.length < 2 || isSubmitted}
              className={`px-6 py-2 rounded-md font-medium ${
                userSequence.length >= 2 && !isSubmitted
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-600/30 text-slate-400 cursor-not-allowed"
              }`}
            >
              Enviar respuestas
            </Button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            {/* SECuencia del usuario */}
            <div style={{ marginBottom: "2rem" }}>
              <h4 className="text-slate-200 font-medium mb-2">Secuencia</h4>
              <p className="text-sm text-slate-400 mb-4">
                Arrastra los elementos para ordenarlos correctamente:
              </p>

              <Droppable droppableId="user-sequence" direction="horizontal">
                {(provided, snap) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`gp-drop-area ${snap.isDraggedOver ? "over" : ""}`}
                    style={{
                      borderColor: isSubmitted
                        ? isCorrect
                          ? "#10b981" /* emerald-500 */
                          : "#ef4444" /* red-500 */
                        : undefined,
                    }}
                  >
                    {userSequence.length === 0 && !snap.isDraggedOver && (
                      <span className="gp-placeholder">
                        Arrastra elementos aquí para ordenarlos
                      </span>
                    )}

                    {userSequence.map((item, idx) => (
                      <div key={`seq-${item.id}`} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <SequenceItem
                          item={item}
                          index={idx}
                          isSubmitted={isSubmitted}
                          isCorrect={isCorrect}
                        />
                        {idx < userSequence.length - 1 && (
                          <ArrowRight
                            className={
                              isSubmitted
                                ? isCorrect
                                  ? "text-emerald-400 w-6 h-6"
                                  : "text-red-400 w-6 h-6"
                                : "text-blue-400 w-6 h-6"
                            }
                          />
                        )}
                      </div>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>

            {/* elementos disponibles */}
            <div>
              <h4 className="text-slate-200 font-medium mb-2">Elementos disponibles</h4>
              <p className="text-sm text-slate-400 mb-4">
                Arrastra estos elementos a la secuencia
              </p>

              <Droppable droppableId="available-items" direction="horizontal">
                {(provided, snap) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`gp-drop-area available ${snap.isDraggedOver ? "over" : ""}`}
                  >
                    {availableItems.length === 0 && !snap.isDraggedOver && (
                      <span className="gp-placeholder">
                        Todos los elementos han sido colocados en la secuencia
                      </span>
                    )}

                    {availableItems.map((item, idx) => (
                      <AvailableItem key={item.id} item={item} index={idx} isSubmitted={isSubmitted} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>

        {/* panel de explicación */}
        {showExplanation && (
          <div ref={explanationRef}>
            <ExplanationPanel question={question} isCorrect={isCorrect} onRetry={resetGame} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- componentes auxiliares ---------- */

function SequenceItem({ item, index, isSubmitted, isCorrect }) {
  const hasImg = item.imageUrl?.trim()
  const hasTxt = item.content?.trim()

  return (
    <Draggable draggableId={`seq-item-${item.id}`} index={index} isDragDisabled={isSubmitted}>
      {(provided, snap) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`gp-item ${snap.isDragging ? "dragging" : ""} ${
            isSubmitted ? (isCorrect ? "correct" : "incorrect") : ""
          } ${!isSubmitted ? "cursor-move" : ""}`}
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

          {/* índice */}
          <div
            className="gp-index"
            style={{
              backgroundColor: isSubmitted
                ? isCorrect
                  ? "#10b981"
                  : "#ef4444"
                : "#2563eb",
              marginTop: "0.5rem",
            }}
          >
            {index + 1}
          </div>
        </div>
      )}
    </Draggable>
  )
}

function AvailableItem({ item, index, isSubmitted }) {
  const hasImg = item.imageUrl?.trim()
  const hasTxt = item.content?.trim()

  return (
    <Draggable draggableId={`avail-item-${item.id}`} index={index} isDragDisabled={isSubmitted}>
      {(provided, snap) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`gp-available-item ${snap.isDragging ? "dragging" : ""} ${
            isSubmitted ? "cursor-not-allowed opacity-50" : "cursor-move"
          }`}
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
  )
}
