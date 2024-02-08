import { cn } from '@bem-react/classname'
import React, { useEffect } from 'react'

import { Card } from '../../models/Card'
import './CardPice.scss'

const bem = cn('CardPice')

export interface CardPiceProps {
  card: Card
  isFlippedByDefault: boolean
}

export const CardPice: React.FC<CardPiceProps> = ({ card, isFlippedByDefault }) => {
  const [isFlipped, setIsFlipped] = React.useState(false)
  const [displayCard, setDisplayCard] = React.useState<Card>(card)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  useEffect(() => {
    setIsFlipped(isFlippedByDefault)
    setDisplayCard(card)
  }, [card, isFlippedByDefault])

  return (
    <div className={bem({ Flipped: isFlipped })} onClick={handleFlip}>
      <h1 className={bem('Word')}>
        {isFlipped ? displayCard.translation : displayCard.word}
      </h1>
    </div>
  )
}
