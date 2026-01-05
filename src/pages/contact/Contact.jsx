import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaPaperPlane
} from "react-icons/fa";
import { toast } from "react-toastify";

export default function ContactUs() {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Feature coming soon...");
        e.target.reset();
    };

    return (
        <section className="min-h-screen bg-base-100 py-10 px-4">
            <title>Contact Us | Bite Share</title>
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        Contact <span className="text-primary">Us</span>
                    </h2>
                    <p className="mx-auto max-w-md text-slate-400">
                        Have questions about Bite Share, sharing foods, or your requests? Reach out — we're here to help!
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* Contact Info */}
                    <div className="space-y-6 text-center">
                        <div className="card bg-base-200 shadow-lg hover:shadow-xl transition">
                            <div className="card-body flex items-center gap-4">
                                <FaEnvelope className="text-3xl text-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold">Email</h3>
                                    <p className="text-base-content/70">support@biteshare.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-lg hover:shadow-xl transition">
                            <div className="card-body flex items-center gap-4">
                                <FaPhoneAlt className="text-3xl text-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold">Phone</h3>
                                    <p className="text-base-content/70">+880 0123 456 789</p>
                                </div>
                            </div>
                        </div>

                        <div className="card bg-base-200 shadow-lg hover:shadow-xl transition">
                            <div className="card-body flex items-center gap-4">
                                <FaMapMarkerAlt className="text-3xl text-primary" />
                                <div>
                                    <h3 className="text-xl font-semibold">Office Address</h3>
                                    <p className="text-base-content/70">Sylhet, Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-200 shadow-lg hover:shadow-xl transition">
                        <div className="card-body">
                            <h2 className="card-title text-2xl mb-4">
                                Send Us a Message
                            </h2>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div>
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        className="input input-bordered w-full"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="label">
                                        <span className="label-text">Message</span>
                                    </label>
                                    <textarea
                                        className="textarea textarea-bordered w-full"
                                        placeholder="Write your message here..."
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                                >
                                    <FaPaperPlane /> Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}