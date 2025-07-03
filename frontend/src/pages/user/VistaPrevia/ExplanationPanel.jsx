"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"

import "./ExplanationPanel.css"

export default function ExplanationPanel({ question, isCorrect, onRetry }) {
  return (
    <Card className="ep-card">
      {/* ---------- Encabezado ---------- */}
      <CardHeader>
        <div className="ep-header">
          <CardTitle className="ep-title">Explicación</CardTitle>
          {!isCorrect && onRetry && (
            <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700 text-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Intentar de nuevo
            </Button>
          )}
        </div>
      </CardHeader>

      {/* ---------- Contenido ---------- */}
      <CardContent className="space-y-4">

        {question.generalExplanation && (
          <div
            className="general-explanation"
            dangerouslySetInnerHTML={{ __html: question.generalExplanation }}
          ></div>
        )}
        

        <div className="ep-sections">
          <h4 className="font-semibold text-yellow-400">Secuencias correctas:</h4>

          {question.sequences.map((seq) => (
            <div key={seq.id} className="space-y-2">
              <h5 className="ep-section-name">{seq.name}</h5>
              {seq.explanation && <p className="ep-section-explanation">{seq.explanation}</p>}

              <div className="ep-grid">
                {seq.items.map((itemId, idx) => {
                  const item = question.items.find((i) => i.id === itemId)
                  return item ? <SequenceStep key={`${seq.id}-${itemId}`} item={item} index={idx} /> : null
                })}
              </div>
            </div>
          ))}
        </div>

        {!isCorrect && (
          <div className="ep-tip">
            💡 <strong>Consejo:</strong> Revisa la explicación de cada paso y luego intenta ordenar la secuencia
            nuevamente.
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ---------- Paso individual ---------- */
function SequenceStep({ item, index }) {
  const hasImg = item.imageUrl?.trim()
  const hasTxt = item.content?.trim()

  return (
    <div className="ep-step">
      <div className="ep-step-index">{index + 1}</div>

        
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flex: 1 }}>
  {/* Solo imagen */}
  {hasImg && (!hasTxt || item.content === "Imagen") && (
    <img src={item.imageUrl} alt="Elemento" className="ep-img" />
  )}

  {/* Solo texto */}
  {!hasImg && hasTxt && (
    <div style={{ flex: 1 }}>
      <p className="ep-content-title">{item.content}</p>
      {item.explanation && (
        <p className="ep-content-explanation">{item.explanation}</p>
      )}
    </div>
  )}

  {/* Imagen + texto */}
  {hasImg && hasTxt && item.content !== "Imagen" && (
    <>
      <img src={item.imageUrl} alt={item.content} className="ep-img" />
      <div style={{ flex: 1 }}>
        <p className="ep-content-title">{item.content}</p>
        {item.explanation && (
          <p className="ep-content-explanation">{item.explanation}</p>
        )}
      </div>
    </>
  )}
</div>


    </div>
  )
}
