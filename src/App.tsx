import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCards } from './state/cards/cards.selectors'
import { AppDispatch } from './state/store'
import { CardPice } from './components/CardPice/CardPice'
import { Card } from './models/Card'
import './App.css'

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const cards = useSelector(selectCards)

  const [currentCard, setCurrentCard] = useState<Card>(cards[0])

  const nextCard = () => {
    const currentCardIndex = cards.indexOf(currentCard)
    if (currentCardIndex === cards.length - 1) {
      setCurrentCard(cards[0])
      return
    }
    setCurrentCard(cards[currentCardIndex + 1])
  }

  const previouseCard = () => {
    const currentCardIndex = cards.indexOf(currentCard)
    if (currentCardIndex === 0) {
      setCurrentCard(cards[cards.length - 1])
      return
    }
    setCurrentCard(cards[currentCardIndex - 1])
  }

  return (
    <div className="App">
      {cards.length === 0 ? 'No cards' : <CardPice card={currentCard} />}
      <button onClick={previouseCard}>back</button>
      <button onClick={nextCard}>next</button>
    </div>
  )
}
