import { FaQuestionCircle } from "react-icons/fa";

export default function FAQ() {
    return (
        <section className="bg-base-200 px-4 py-8 md:py-12 my-6 md:my-10">
            <div className="containerr mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex justify-center items-center gap-2">
                        <FaQuestionCircle className="text-primary text-4xl md:text-3xl" />
                        <h2 className="text-3xl font-bold md:text-4xl">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
                        Common questions about food sharing, requests, and how Bite Share works
                    </p>
                </div>
                {/* Accordion */}
                <div className="max-w-3xl mx-auto space-y-3">
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" defaultChecked />
                        <div className="collapse-title font-semibold">
                            What is Bite Share?
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            Bite Share is a community-driven food sharing platform where people
                            can donate surplus food and others can request it to reduce food
                            waste and help those in need.
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold">
                            Who can donate food on Bite Share?
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            Anyone with a verified account can donate food. Simply add food
                            details such as quantity, expiry date, and pickup location.
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold">
                            How do food requests work?
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            Users can browse available food items and send a request. The food
                            donor can then review the request and choose to accept or reject it.
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold">
                            How do I collect the food after my request is accepted?
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            Once your request is approved, you can collect the food by
                            self-pickup or arrange a courier, depending on the donor’s preference.
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="radio" name="faq-accordion" />
                        <div className="collapse-title font-semibold">
                            Is Bite Share free to use?
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            Yes. Bite Share is completely free to use and focuses on community
                            support and reducing food waste.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}