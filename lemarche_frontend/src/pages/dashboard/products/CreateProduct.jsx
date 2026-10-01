import {
  useState,
  useEffect
} from "react";
import API from "../../../api/axios";
import {
  useNavigate
} from "react-router-dom";
export default function CreateProduct() {
  const navigate =
    useNavigate();
  const [categories,
    setCategories] =
    useState([]);
  const [imagePreview,
    setImagePreview] =
    useState(null);
  const [form,
    setForm] =
    useState({
    title: "",
    description: "",
    category: "",
    product_type: "digital",
    price: "",
    whatsapp_number: "",
    image: null,
    digital_file: null
  });
  // 📂 Charger catégories
  useEffect(() => {
    const fetchCategories =
      async () => {
      try {
        const res =
          await API.get(
            "/categories/"
          );
        setCategories(res.data);
      } catch (error) {
        console.log(
          "CATEGORY ERROR",
          error
        );
      }
    };
    fetchCategories();
  }, []);
  // INPUT CHANGE
  const handleChange =
    (e) => {
    const {
      name,
      value
    } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  // IMAGE
  const handleImage =
    (e) => {
    const file =
      e.target.files[0];
    setForm({
      ...form,
      image: file
    });
    setImagePreview(
      URL.createObjectURL(file)
    );
  };
  // FILE DIGITAL
  const handleFile =
    (e) => {
    setForm({
      ...form,
      digital_file:
        e.target.files[0]
    });
  };
  // SUBMIT
  const handleSubmit =
    async (e) => {
    e.preventDefault();
    const formData =
      new FormData();
    Object.keys(form)
      .forEach(key => {
      if (form[key]) {
        formData.append(
          key,
          form[key]
        );
      }
    });
    try {
      await API.post(
        "/products/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );
      navigate(
        "/dashboard/products"
      );
    } catch (error) {
      console.log(
        "CREATE ERROR:",
        error.response?.data
      );
    }
  };
  return (
    <div className="p-6">
      <h1 className="
        text-2xl
        font-bold
        mb-6
      ">
        ➕ Ajouter Produit
      </h1>
      <form
        onSubmit={handleSubmit}
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >
        {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Titre produit"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
          required
        />
        {/* PRICE */}
        <input
          type="number"
          name="price"
          placeholder="Prix"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
          required
        />
        {/* CATEGORY */}
        <select
          name="category"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
          required
        >
          <option value="">
            Choisir catégorie
          </option>
          {categories.map(
            (cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
        {/* TYPE */}
        <select
          name="product_type"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
        >
          <option value="digital">
            Digital
          </option>
          <option value="physical">
            Physical
          </option>
          <option value="service">
            Service
          </option>
          <option value="job">
            Job
          </option>
        </select>
        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
            md:col-span-2
          "
          required
        />
        {/* WHATSAPP */}
        <input
          type="text"
          name="whatsapp_number"
          placeholder="Numéro WhatsApp"
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
        />
        {/* IMAGE */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="
                mt-2
                w-24
                h-24
                object-cover
                rounded
              "
            />
          )}
        </div>
        {/* FILE */}
        <input
          type="file"
          onChange={handleFile}
        />
        {/* BUTTON */}
        <button
          type="submit"
          className="
            bg-indigo-600
            text-white
            px-6
            py-3
            rounded-lg
            md:col-span-2
            hover:bg-indigo-700
          "
        >
          Créer produit
        </button>
      </form>
    </div>
  );
}