import { useFloating, autoUpdate, FloatingPortal, arrow, FloatingArrow, offset, Placement } from '@floating-ui/react'
import { ReactNode, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
type Props = {
  children: ReactNode
  popoverParent: ReactNode
  initialOpen?: boolean
  placement?: Placement
}

const Popover = ({ children, popoverParent, initialOpen = false, placement = 'bottom-end' }: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen)
  const arrowRef = useRef(null)
  const ARROW_WIDTH = 25
  const ARROW_HEIGHT = 10
  const id = useId()

  const { refs, x, y, strategy, context, middlewareData } = useFloating({
    placement,
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(ARROW_HEIGHT), arrow({ element: arrowRef })],
    whileElementsMounted: autoUpdate
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <div ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {popoverParent}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              className="shadow-md "
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              <div className={`bg-red absolute bottom-full left-0   w-full `} style={{ height: `${ARROW_HEIGHT}px` }} />
              <FloatingArrow
                ref={arrowRef}
                context={context}
                fill="white"
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                style={{ transform: 'translateY(-1px)' }}
              />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
export default Popover
