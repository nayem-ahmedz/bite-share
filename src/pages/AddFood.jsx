import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AddFood() {
    const { currentUser } = useContext(AuthContext);
    const [active, setActive] = useState(false);
    const [error, setError] = useState('');
    // console.log(currentUser);
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setActive(true);
        const form = e.target;
        const foodName = form.foodName.value.trim();
        const foodQuantity = parseInt(form.foodQuantity.value);
        const pickupLocation = form.pickupLocation.value.trim();
        const expireDate = form.expireDate.value;
        const notes = form.notes.value;
        // access the file input by name and then getting first el
        const fileInput = form.foodImage;
        const selectedFile = fileInput.files[0];
        if (!selectedFile) {
            alert("Please select an image file");
            return;
        }
        if (!selectedFile.type.startsWith("image/")) {
            alert("Only image files are allowed!");
            return;
        }

        // Prepare FormData for ImgBB
        const formData = new FormData();
        formData.append("image", selectedFile);

        // first try to upload image to imagebb and generate a link
        try {
            const imageResponse = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebbAPI}`, {
                method: "POST",
                body: formData
            });
            const imgData = await imageResponse.json();
            if (!imgData.success) {
                setError("Unable to upload image, try again");
                return;
            }
            const imageUrl = imgData.data.url; // ImgBB direct URL
            const foodData = {
                donator: currentUser.displayName,
                email: currentUser.email,
                donatorPhoto: currentUser.photoURL,
                foodName,
                foodQuantity,
                pickupLocation,
                expireDate,
                notes,
                imageUrl,
                foodStatus: 'Available'
            };
            // send food data to backend
            const idToken = await currentUser.getIdToken();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}foods`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                },
                body: JSON.stringify(foodData)
            });
            const result = await response.json();
            if (!response.ok) {
                setError(result.message);
                return;
            }
            if(result.insertedId){
                toast.success('Food is added Successfully');
            }
            form.reset();
        } catch (error) {
            if (error.message.includes("ImgBB")) {
                setError("Unable to upload image — check file type");
            } else if (error.message.includes("Backend")) {
                setError(error.message);
            } else {
                setError("Unexpected error occurred");
            }
        } finally {
            setActive(false);
        }
    }
    return (
        <section>
            <h2 className="text-2xl md:text-3xl font-bold text-center mt-4">Add Food</h2>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-10 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="fieldset">
                            <label htmlFor="name" className="label mt-1">Food Name</label>
                            <input type="text" id="name" name="foodName" className="input w-full" placeholder="Food Name" required />
                            {/* food image input / file */}
                            <label htmlFor="food-image" className="label mt-1">Food Image</label>
                            <input type="file" id="food-image" name="foodImage" className="file-input w-full" accept="image/*" required />
                            <label htmlFor="quantity" className="label mt-1">Food Quantity</label>
                            <select defaultValue="Select a option" className="select w-full" id="quantity" name="foodQuantity">
                                <option disabled={true}>Select a option</option>
                                <option value='1'>Serves 1 people</option>
                                <option value='2'>Serves 2 people</option>
                                <option value='3'>Serves 3 people</option>
                                <option value='4'>Serves 5 people</option>
                                <option value='5'>Serves more than 5 people</option>
                            </select>
                            <label htmlFor="location" className="label mt-1">Pickup Location</label>
                            <input type="text" id="location" name="pickupLocation" className="input w-full" placeholder="Pickup Location Name" required />
                            <label htmlFor="expired-date" className="label mt-1">Expire Date</label>
                            <input type="date" id="expired-date" name="expireDate" className="input w-full" placeholder="Expire Date" required />
                            <label htmlFor="notes" className="label mt-1">Additional Notes</label>
                            <textarea name="notes" id="notes" className="textarea w-full" placeholder="Additional Notes" required></textarea>
                            {
                                error && <p className="text-red-500 mt-2 text-base text-center font-medium">{error}</p>
                            }
                            <button type="submit" className="btn btn-neutral mt-4" disabled={active}>Save Food</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </section>
    );
}