import Header from "./Header";
import Footer from "./Footer";
export default function FAQ() {
    return (
        <div className="bg-base-color text-white min-h-screen">
            <Header/>
            <main className="text-center pt-24 px-4">
                <section className="mb-20 border-b-5 border-white/10 pb-20">
                    <h2 className="text-4xl font-extrabold mb-10">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto text-left">
                        <h3 className="text-xl font-semibold mb-4">What is The Gaffer?</h3>
                        <p className="mb-6">The Gaffer is a football management simulation game where you can create and test your own custom tactics.</p>

                        <h3 className="text-xl font-semibold mb-4">How do I start playing?</h3>
                        <p className="mb-6">You can start playing by registering an account and logging in. Once logged in, you can access the Formation Lab to create your tactics.</p>

                        <h3 className="text-xl font-semibold mb-4">Is there a mobile version?</h3>
                        <p>Currently, The Gaffer is optimized for desktop browsers. A mobile version may be developed in the future.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}