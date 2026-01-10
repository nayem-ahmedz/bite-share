import { motion } from "motion/react";
import { FaHandHoldingHeart, FaSearch, FaPaperPlane, FaCheckCircle } from "react-icons/fa";

export default function Procedures() {
    const steps = [
        {
            id: 1,
            title: "Donate Food",
            description: "Community members donate surplus food by adding details like quantity, location, and expiry time.",
            icon: FaHandHoldingHeart,
        },
        {
            id: 2,
            title: "Discover Available Food",
            description: "People in need can browse all available food items shared by others in the community.",
            icon: FaSearch,
        },
        {
            id: 3,
            title: "Request Food",
            description: "Interested users send a request for food directly to the donor with a short message.",
            icon: FaPaperPlane,
        },
        {
            id: 4,
            title: "Accept & Collect",
            description: "Donors review requests and accept one. The receiver then collects the food by themselves or via courier.",
            icon: FaCheckCircle,
        },
    ];

    return (
        <section className="p-4 my-6 md:my-10">
            <div className="mx-auto max-w-7xl px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        How <span className="text-primary">Food Sharing</span> Works
                    </h2>
                    <p className="mx-auto max-w-2xl text-slate-400">
                        A community-driven process that connects food donors with people in need,
                        reducing waste and spreading kindness.
                    </p>
                </motion.div>

                {/* Steps grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.12 }}
                                whileHover={{ y: -6 }}
                                className="group relative rounded-2xl border border-white/10 bg-base-200 p-6 text-center"
                            >
                                {/* Step number */}
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary/20 px-4 py-1 text-sm font-semibold text-primary">
                                    Step {step.id}
                                </span>

                                {/* Icon */}
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"
                                >
                                    <Icon size={26} />
                                </motion.div>

                                <h3 className="mb-3 text-lg font-semibold">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-slate-400">
                                    {step.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}