import { FaUtensils, FaPeopleCarry, FaHandsHelping, FaStar, FaMobileAlt, FaClock } from "react-icons/fa";

export default function About() {
    return (
        <section className="min-h-screen bg-base-100 py-10 px-4">
            <title>About Us | Bite Share</title>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        About <span className="text-primary">Bite Share</span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-slate-400">
                        Bite Share is a modern food-sharing platform where users can explore, share, and request food items in a safe, interactive, and responsive environment.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-2">
                                <FaUtensils className="text-3xl text-primary" />
                                <h2 className="card-title text-2xl">Our Mission</h2>
                            </div>
                            <p className="text-base-content/70">
                                To create a community-driven platform where users can share and discover food, reduce waste, and connect with others in a meaningful way.
                            </p>
                        </div>
                    </div>

                    <div className="card bg-base-200 shadow-lg">
                        <div className="card-body">
                            <div className="flex items-center gap-3 mb-2">
                                <FaStar className="text-3xl text-primary" />
                                <h2 className="card-title text-2xl">Our Vision</h2>
                            </div>
                            <p className="text-base-content/70">
                                To become the go-to platform for food sharing and sustainable food practices, making it easy for everyone to give, receive, and enjoy food responsibly.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Key Features */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Key Features
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="card bg-base-200 shadow hover:shadow-xl transition">
                            <div className="card-body items-center text-center">
                                <FaPeopleCarry className="text-4xl text-secondary mb-3" />
                                <h3 className="card-title">Food Sharing</h3>
                                <p className="text-sm text-base-content/70">
                                    Easily add, share, and manage food items for the community.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow hover:shadow-xl transition">
                            <div className="card-body items-center text-center">
                                <FaHandsHelping className="text-4xl text-secondary mb-3" />
                                <h3 className="card-title">Food Requests</h3>
                                <p className="text-sm text-base-content/70">
                                    Request food from others and approve incoming requests as an owner.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow hover:shadow-xl transition">
                            <div className="card-body items-center text-center">
                                <FaMobileAlt className="text-4xl text-secondary mb-3" />
                                <h3 className="card-title">Responsive Design</h3>
                                <p className="text-sm text-base-content/70">
                                    Works smoothly on mobile, tablet, and desktop devices.
                                </p>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow hover:shadow-xl transition">
                            <div className="card-body items-center text-center">
                                <FaClock className="text-4xl text-secondary mb-3" />
                                <h3 className="card-title">Real-Time Updates</h3>
                                <p className="text-sm text-base-content/70">
                                    Stay updated with latest food availability and requests instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Why Choose Bite Share */}
                <div className="card bg-base-200 shadow-lg mb-20">
                    <div className="card-body">
                        <h2 className="card-title text-3xl justify-center mb-6">
                            Why Choose Bite Share?
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-base-content/80">
                            <p>✔ Community-driven platform</p>
                            <p>✔ Reduce food waste</p>
                            <p>✔ Easy-to-use interface</p>
                            <p>✔ Manage your foods efficiently</p>
                            <p>✔ Smooth and fast interactions</p>
                            <p>✔ Responsive on all devices</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Join the Bite Share Community
                    </h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">
                        Share your meals, explore new foods, and connect with fellow food enthusiasts on Bite Share.
                    </p>
                </div>

            </div>
        </section>
    );
}