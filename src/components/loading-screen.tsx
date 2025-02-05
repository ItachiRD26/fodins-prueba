import { motion } from "framer-motion"

const LoadingScreen = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3b82f6",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        style={{
          width: "5rem",
          height: "5rem",
          border: "4px solid white",
          borderTopColor: "transparent",
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </motion.div>
  )
}

export default LoadingScreen

