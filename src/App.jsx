import './App.css'
import { Books } from './components/Books'
import { Filters } from './components/Filters'
import { FiltersContext } from './contexts/filters'
import { usePriority } from './hooks/usePriority'
import { PriorityContext } from './contexts/priority'

function App() {

  return (
    <FiltersContext>
      <h1>Books App 📚</h1>
      <Filters />
      
      <PriorityContext>
        <Books />
      </PriorityContext>
    </FiltersContext>
  )
}

export default App
