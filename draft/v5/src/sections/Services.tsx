import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Truck, Ship, Train, Cpu, Warehouse } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'Road',
    icon: Truck,
    description: 'Full and partial loads throughout Europe. Daily departures, fixed transit times, and real-time tracking for your supply chain.',
    details: ['Full truckload (FTL)', 'Less than truckload (LTL)', 'Express & time-critical', 'Temperature-controlled'],
  },
  {
    number: '02',
    title: 'Logistics',
    icon: Warehouse,
    description: 'Warehousing, fulfilment, and value-added services. Scalable solutions from single-pallet storage to full supply-chain management.',
    details: ['Warehouse management', 'Pick & pack', 'Returns handling', 'Inventory optimization'],
  },
  {
    number: '03',
    title: 'Air & Sea',
    icon: Ship,
    description: 'Global freight forwarding by air and ocean. Door-to-door service with customs clearance and documentation.',
    details: ['Air freight', 'Ocean FCL & LCL', 'Customs brokerage', 'Multimodal solutions'],
  },
  {
    number: '04',
    title: 'Rail',
    icon: Train,
    description: 'Sustainable intermodal transport combining road and rail. Reducing CO₂ while maintaining reliability.',
    details: ['Intermodal transport', 'Block train services', 'Last-mile integration', 'Carbon reduction'],
  },
  {
    number: '05',
    title: 'Digital',
    icon: Cpu,
    description: 'Digital tools and platforms for visibility, booking, and supply-chain optimization.',
    details: ['Real-time tracking', 'Digital booking portal', 'API integrations', 'Data analytics'],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      className="border border-border-light rounded-card overflow-hidden cursor-pointer transition-morph"
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.165, 0.84, 0.44, 1],
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-gap-lg flex items-start justify-between">
        <div className="flex items-start gap-gap-md">
          <span className="text-body-sm text-text-muted font-normal">{service.number}</span>
          <div>
            <div className="flex items-center gap-gap-xs mb-2">
              <Icon className="w-5 h-5 text-brand-red" strokeWidth={1.5} />
              <h3 className="text-h4-mobile md:text-h4 font-normal text-ink">{service.title}</h3>
            </div>
            <p className="text-body-reg text-text-muted max-w-[480px]">{service.description}</p>
          </div>
        </div>
        <motion.span
          className="text-h5 text-ink mt-1 select-none"
          animate={{ rotate: expanded ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.3, 0, 0.2, 1] }}
        >
          +
        </motion.span>
      </div>

      <div
        className="transition-expand overflow-hidden"
        style={{ maxHeight: expanded ? '35rem' : '0' }}
      >
        <div className="px-gap-lg pb-gap-lg pt-0 ml-[2.5rem]">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-gap-xs">
            {service.details.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-body-reg text-ink">
                <span className="w-1.5 h-1.5 rounded-full bg-coral shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="group inline-flex items-center gap-1 mt-gap-md text-body-reg text-coral transition-hover hover:text-brand-red"
          >
            Learn more
            <span className="arrow-nudge inline-block">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-section-lg px-[1.5rem]">
      <div className="max-w-10col mx-auto">
        <div className="mb-gap-xxl">
          <p className="text-body-sm text-text-muted mb-gap-xs uppercase tracking-wide">What we do</p>
          <h2 className="text-h2-mobile md:text-h2 font-normal text-ink">Our services</h2>
        </div>
        <div className="flex flex-col gap-gap-xs">
          {services.map((service, i) => (
            <ServiceCard key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
