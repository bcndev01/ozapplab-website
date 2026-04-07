import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronDown, Mail, MessageCircle, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DataContext } from '../App'
import PageWrapper from '../components/PageWrapper'

function FAQItem({ question, answer, isOpen, onClick, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 + 0.1 }}
      className={`glass-card rounded-xl overflow-hidden ${isOpen ? 'ring-1 ring-accent/20' : ''}`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <HelpCircle size={16} className={`flex-shrink-0 transition-colors ${isOpen ? 'text-accent' : 'text-text-muted'}`} />
          <span className="font-semibold text-[15px]">{question}</span>
        </div>
        <ChevronDown
          size={16}
          className={`text-text-muted flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pl-12 text-text-secondary text-sm leading-relaxed border-t border-border pt-4 mx-5 mb-0">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Support() {
  const { appId } = useParams()
  const data = useContext(DataContext)
  const app = data?.apps.find(a => a.id === appId)
  const [openIndex, setOpenIndex] = useState(null)

  if (!app) return null

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/[0.08] border border-accent/10 flex items-center justify-center mx-auto mb-6">
            <MessageCircle size={28} className="text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{app.name} Support</h1>
          <p className="text-text-secondary">Having issues? We&apos;re here to help!</p>
        </motion.div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <HelpCircle size={18} className="text-accent" />
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {app.support.faq.map((item, i) => (
              <FAQItem
                key={i}
                index={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-10 text-center"
        >
          <Mail size={28} className="text-accent mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Still need help?</h2>
          <p className="text-text-secondary text-sm mb-6">Can&apos;t find your answer? Reach out directly.</p>

          <a
            href={`mailto:${app.support.email}`}
            className="inline-flex items-center gap-2.5 bg-accent text-dark-950 px-7 py-3 rounded-xl font-semibold hover:shadow-[0_0_25px_rgba(74,222,128,0.25)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <Mail size={18} /> {app.support.email}
          </a>

          <div className="mt-8 grid grid-cols-2 gap-3 max-w-sm mx-auto">
            {['Device model', 'iOS version', 'Issue description', 'Screenshots'].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-text-muted text-xs px-3 py-2 rounded-lg bg-white/[0.02] border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
                {item}
              </div>
            ))}
          </div>

          <p className="text-text-muted text-xs mt-6">We typically respond within {app.support.responseTime}.</p>
        </motion.div>
      </div>
    </PageWrapper>
  )
}
