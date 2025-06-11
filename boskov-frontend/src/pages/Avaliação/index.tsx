import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

interface AvaliacaoForm {
  nota: number
  comentario: string
}

function parseJwt(token: string) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = atob(base64Payload)
    return JSON.parse(payload)
  } catch (e) {
    return null
  }
}

const AvaliacaoPage: React.FC = () => {
  const { idFilme } = useParams<{ idFilme: string }>()
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const userPayload = token ? parseJwt(token) : null
  const idUsuario = userPayload?.id || userPayload?.userId || userPayload?.sub // Depende do payload do seu token

  const [form, setForm] = useState<AvaliacaoForm>({ nota: 0, comentario: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!idUsuario) {
      setError('Usuário não autenticado. Faça login para avaliar.')
      return
    }

    if (!form.nota || form.nota < 1 || form.nota > 5) {
      setError('Por favor, selecione uma nota entre 1 e 5.')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/avaliacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // passa o token no header
        },
        body: JSON.stringify({
          id_usuario: idUsuario,
          id_filme: Number(idFilme),
          nota: Number(form.nota),
          comentario: form.comentario,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || 'Erro ao enviar avaliação.')
        return
      }

      setSuccess('Avaliação enviada com sucesso!')
      setTimeout(() => {
        navigate('/filmes')
      }, 1500)
    } catch (err) {
      setError('Erro ao enviar avaliação.')
      console.error(err)
    }
  }

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Avaliar Filme</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nota">Nota:</label>
        <select name="nota" id="nota" value={form.nota} onChange={handleChange} required>
          <option value={0}>Selecione uma nota</option>
          {[1, 2, 3, 4, 5].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <label htmlFor="comentario">Comentário:</label>
        <textarea
          id="comentario"
          name="comentario"
          value={form.comentario}
          onChange={handleChange}
          rows={4}
          placeholder="Deixe um comentário"
        />

        {error && <p className="error">{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Enviar Avaliação</button>
      </form>
    </div>
  )
}

export default AvaliacaoPage
