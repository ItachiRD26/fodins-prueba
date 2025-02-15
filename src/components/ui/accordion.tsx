// components/ui/accordion.tsx
import * as React from "react"
import { ChevronDown } from "lucide-react"

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  value: string
  trigger: React.ReactNode
  children: React.ReactNode
}

const AccordionContext = React.createContext<{
  activeItem: string | null
  setActiveItem: (value: string | null) => void
}>({
  activeItem: null,
  setActiveItem: () => {},
})

export function Accordion({ children, className }: AccordionProps) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  return (
    <AccordionContext.Provider value={{ activeItem, setActiveItem }}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, trigger, children }: AccordionItemProps) {
  const { activeItem, setActiveItem } = React.useContext(AccordionContext)

  const isActive = activeItem === value

  const toggleAccordion = () => {
    setActiveItem(isActive ? null : value)
  }

  return (
    <div className="border-b">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full py-4 text-left font-semibold focus:outline-none"
      >
        {trigger}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${isActive ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isActive ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  )
}