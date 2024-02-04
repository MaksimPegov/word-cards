import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from './state/store'
import { addCard } from './state/cards/card.actions'
import { selectCards } from './state/cards/cards.selectors'

function App() {
  const cards = useSelector(selectCards)
  const dispatch = useDispatch<AppDispatch>()

  return (
    <div className="App">
      <div>
        {cards.map((card) => (
          <div key={card.word}>{card.word + ' | ' + card.translation}</div>
        ))}
      </div>

      <button
        onClick={() => dispatch(addCard({ word: 'word', translation: 'translation' }))}
      >
        Add card
      </button>
    </div>
  )
}

export default App
