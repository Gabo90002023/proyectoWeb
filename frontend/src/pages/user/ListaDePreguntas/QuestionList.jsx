"use client"

import React from "react"
import { Plus, Play, Edit, Trash2, GripVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import "./QuestionList.css"

export default function QuestionList({ questions, onEdit, onPlay, onDelete, onCreateNew }) {
  return (
    <div className="question-list-container">
      <div className="question-list-inner">
        <div className="question-list-header">
          <div>
            <h1 className="question-list-title">Lista de Preguntas Secuenciales</h1>
            <p className="question-list-subtitle">Crea actividades interactivas de ordenamiento secuencial</p>
          </div>
          <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Nueva pregunta
          </Button>
        </div>

        <div className="question-list-grid">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onEdit={() => onEdit(question)}
              onPlay={() => onPlay(question)}
              onDelete={() => onDelete(question.id)}
            />
          ))}
        </div>

        {questions.length === 0 && <EmptyState onCreateNew={onCreateNew} />}
      </div>
    </div>
  )
}

function formatCategoria(categoria) {
  const categorias = {
    "Kits": "Kits (6-8 años)",
    "Ruedas": "Ruedas (8-10 años)",
    "Benjamines": "Benjamines (10-12 años)",
    "Cadetes": "Cadetes (12-14 años)",
    "Juniors": "Juniors (14-16 años)",
    "Personas mayores": "Personas mayores (16-18 años)"
  };

  return categorias[categoria] || categoria;
}

function QuestionCard({ question, onEdit, onPlay, onDelete }) {
  return (
    <Card className="question-card">
      <CardHeader>
        <CardTitle className="question-card-title">{question.title}</CardTitle>
          {/* Mostrar categoría */}
          {question.category && (
            <p className="text-xs text-sky-400 font-semibold mt-1">
              Categoría: {formatCategoria(question.category)}
            </p>
          )}

          <div
            className="question-video-wrapper text-sm text-slate-300 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: question.instructions }}
          ></div>
          {question.question && (
            <div
              className="text-sm text-yellow-400 line-clamp-2 font-medium"
              dangerouslySetInnerHTML={{ __html: question.question }}
            ></div>
          )}
      </CardHeader>
      <CardContent>
        <div className="question-card-items">
          {question.items.slice(0, 3).map((item) => (
            <div key={item.id} className="question-card-item">

              {item.imageUrl && (
                <img
                  src={item.imageUrl || "/placeholder.svg"}
                  alt="Ítem"
                  className="question-card-image"
                />
              )}
              {item.content && item.content !== "Imagen" && (
                <span className="truncate max-w-20">{item.content}</span>
              )}

            </div>
          ))}
          {question.items.length > 3 && (
            <span className="question-card-more">+{question.items.length - 3} más</span>
          )}
          {/* {question.sequences?.length > 0 && (
            <p className="text-xs text-slate-400 mt-2">
              {question.sequences.length} secuencia{question.sequences.length > 1 ? "s" : ""}
            </p>
          )} */}
        </div>
        <div className="flex gap-2">
          <Button onClick={onPlay} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Vista Previa
          </Button>
          <Button
            onClick={onEdit}
            variant="outline"
            size="icon"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            onClick={onDelete}
            variant="outline"
            size="icon"
            className="text-red-400 hover:text-red-300 border-red-400 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ onCreateNew }) {
  return (
    <Card className="question-empty-card">
      <CardContent>
        <div className="question-empty-icon">
          <GripVertical className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="question-empty-title">No hay preguntas creadas</h3>
        <p className="question-empty-subtitle">Comienza creando tu primera pregunta secuencial</p>
        <Button onClick={onCreateNew} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Crear primera pregunta
        </Button>
      </CardContent>
    </Card>
  )
}
