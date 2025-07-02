"use client"

import { useEffect, useState } from "react"
import QuestionList from "./ListaDePreguntas/QuestionList"
import QuestionEditor from "./EditorPregunta/QuestionEditor"
import GamePlayer from "./VistaPrevia/GamePlayer"
import { getAllPreguntas, createPregunta, updatePregunta, deletePregunta } from "../../services/preguntaService"


function SequenceEditor() {

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Al cargar el componente
  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
  try {
    const data = await getAllPreguntas()
    setQuestions(data)
  } catch (error) {
    console.error("Error al cargar preguntas:", error)
  }
}

  const startEditing = (question = null) => {
    setCurrentQuestion(question)
    setIsEditing(true)
    setIsPlaying(false)
  }

  const startPlaying = (question) => {
    setCurrentQuestion(question)
    setIsPlaying(true)
    setIsEditing(false)
  }

  const saveQuestion = async (data) => {
    try {
      if (currentQuestion) {
        await updatePregunta(currentQuestion.id, data)
      } else {
        await createPregunta(data)
      }

      await loadQuestions()
      setIsEditing(false)
      setCurrentQuestion(null)
    } catch (error) {
      console.error("Error al guardar la pregunta:", error)
    }
  }

  const deleteQuestion = async (id) => {
    try {
      await deletePregunta(id)
      setQuestions(questions.filter(q => q.id !== id))
    } catch (error) {
      console.error("Error al eliminar la pregunta:", error)
    }
  }


  const goBack = () => {
    setIsEditing(false)
    setIsPlaying(false)
    setCurrentQuestion(null)
  }

  if (isPlaying && currentQuestion) {
    return <GamePlayer question={currentQuestion} onBack={goBack} />
  }

  if (isEditing) {
    return <QuestionEditor question={currentQuestion} onSave={saveQuestion} onCancel={goBack} />
  }

  return (
    <QuestionList
      questions={questions}
      onEdit={startEditing}
      onPlay={startPlaying}
      onDelete={deleteQuestion}
      onCreateNew={() => startEditing()}
    />
  )
}

export default SequenceEditor;
