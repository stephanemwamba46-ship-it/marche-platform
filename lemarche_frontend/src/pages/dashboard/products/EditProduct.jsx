import {
  useState,
  useEffect
} from "react";
import API from "../../../api/axios";
import {
  useNavigate,
  useParams
} from "react-router-dom";
export default function EditProduct() {
  const { slug } =
    useParams();
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
  // 📡 Charger produit
  useEffect(() => {
    const fetchProduct =
      async () => {
      try {
        const res =
          await API.get(
            `/products/${slug}/`
          );
        setForm({
          ...res.data,
          image: null,
          digital_file: null
        });
        setImagePreview(
          res.data.image
        );
      } catch (error) {
        console.log(
          "PRODUCT LOAD ERROR",
          error
        );
      }
    };
    const fetchCategories =
      async () => {
      try {
        const res =
          await API.get(
            "/categories/"
          );
        setCategories(
          res.data
        );
      } catch (error) {
        console.log(
          "CATEGORY ERROR",
          error
        );
      }
    };
    fetchProduct();
    fetchCategories();
  }, [slug]);
  // CHANGE
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
  // FILE
  const handleFile =
    (e) => {
    setForm({
      ...form,
      digital_file:
        e.target.files[0]
    });
  };
  // UPDATE
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
      await API.put(
        `/products/${slug}/`,
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
        "UPDATE ERROR:",
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
        ✏️ Modifier Produit
      </h1>
      <form
        onSubmit={handleSubmit}
        className="
          grid
          md:grid-cols-2
          gap-6
        "
      >
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
          "
        >
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
        <select
          name="product_type"
          value={form.product_type}
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
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="
            border
            p-3
            rounded-lg
            md:col-span-2
          "
        />
        <input
          type="text"
          name="whatsapp_number"
          value={form.whatsapp_number}
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
          Mettre à jour
        </button>
      </form>
    </div>
  );
}