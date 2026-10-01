import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Highlight from "@tiptap/extension-highlight";
import Blockquote from "@tiptap/extension-blockquote";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Youtube from "@tiptap/extension-youtube";
import { useState } from "react";
import axios from "axios";
export default function StepDescription({
  productData,
  setProductData,
  nextStep,
  prevStep
}) {
  const [error, setError] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  /* EDITOR */
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Strike,
      Blockquote,
      Link.configure({
        openOnClick: false
      }),
      Youtube,
      TextStyle,
      Highlight.configure({
        multicolor: true
      }),
      Color.configure({
        types: ["textStyle"]
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    content: productData.description || "",
    onUpdate: ({ editor }) => {
      setProductData({
        ...productData,
        description: editor.getHTML()
      });
    }
  });
  if (!editor) return null;
  /* ========================= */
  /* 🤖 ASSISTANT IA */
  /* ========================= */
  const handleGenerateAI = async () => {
    try {
      setLoadingAI(true);
      let currentText = editor.getText();
      if (!currentText || currentText.trim() === "") {
        currentText =
          "Créer une description professionnelle pour un produit marketplace.";
      }
      const res = await axios.post(
        "http://127.0.0.1:8000/api/assistant/",
        {
          message: currentText
        }
      );
      const aiText = res.data.response;
      editor
        .chain()
        .focus()
        .setContent(aiText)
        .run();
    } catch (error) {
      console.error(error);
      alert(
        "Erreur génération IA. Vérifiez votre connexion ou votre quota OpenAI."
      );
    }
    setLoadingAI(false);
  };
  /* ========================= */
  /* IMAGE UPLOAD */
  /* ========================= */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    editor
      .chain()
      .focus()
      .setImage({
        src: url
      })
      .run();
  };
  /* ========================= */
  /* VIDEO */
  /* ========================= */
  const handleVideo = () => {
    const url = prompt("Entrer URL YouTube");
    if (!url) return;
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: url,
        width: 640,
        height: 360
      })
      .run();
  };
  /* ========================= */
  /* LINK */
  /* ========================= */
  const handleLink = () => {
    const previousUrl =
      editor.getAttributes("link").href;
    const url =
      prompt("Entrer URL du lien :", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();
      return;
    }
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };
  /* ========================= */
  /* VALIDATION */
  /* ========================= */
  const handleNext = () => {
    if (
      !productData.description ||
      productData.description === "<p></p>"
    ) {
      setError(
        "La description est obligatoire"
      );
      return;
    }
    setError("");
    nextStep();
  };
  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h2 className="
        text-2xl
        font-bold
        flex
        items-center
        gap-2
        ">
          📝 Ajouter la description du produit
        </h2>
        <p className="
        text-gray-500
        text-sm
        ">
          Décrivez votre produit de manière claire et attractive
        </p>
      </div>
      {/* AI BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleGenerateAI}
          className="
          px-5
          py-2
          bg-gradient-to-r
          from-indigo-500
          to-purple-500
          text-white
          rounded-xl
          shadow-md
          hover:opacity-90
          transition
          "
        >
          {loadingAI ? "IA..." : "✨ Assistant IA"}
        </button>
      </div>
      {/* TOOLBAR */}
      <div className="
      flex
      flex-wrap
      gap-2
      p-3
      bg-white
      border
      rounded-xl
      shadow-sm
      ">
        {/* FONT TYPE */}
        <select
          onChange={(e) => {
            const level =
              Number(e.target.value);
            if (level === 0) {
              editor
                .chain()
                .focus()
                .setParagraph()
                .run();
            }
            else {
              editor
                .chain()
                .focus()
                .toggleHeading({
                  level
                })
                .run();
            }
          }}
          className="toolbar-select"
        >
          <option value="0">
            Normal
          </option>
          <option value="1">
            Titre 1
          </option>
          <option value="2">
            Titre 2
          </option>
          <option value="3">
            Titre 3
          </option>
        </select>
        {/* TEXT STYLE */}
        <button
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="toolbar-btn"
        >
          B
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="toolbar-btn"
        >
          I
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className="toolbar-btn"
        >
          U
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleStrike().run()
          }
          className="toolbar-btn"
        >
          S
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          className="toolbar-btn"
        >
          ❝
        </button>
        {/* TEXT COLOR */}
        <input
          type="color"
          onInput={(e) =>
            editor
              .chain()
              .focus()
              .setColor(e.target.value)
              .run()
          }
        />
        {/* BACKGROUND */}
        <input
          type="color"
          onInput={(e) =>
            editor
              .chain()
              .focus()
              .toggleHighlight({
                color: e.target.value
              })
              .run()
          }
        />
        {/* ALIGN */}
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className="toolbar-btn"
        >
          ⬅
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className="toolbar-btn"
        >
          ⬌
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className="toolbar-btn"
        >
          ➡
        </button>
        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("justify").run()
          }
          className="toolbar-btn"
        >
          ☰
        </button>
        {/* LINK */}
        <button
          onClick={handleLink}
          className="toolbar-btn"
        >
          🔗
        </button>
        {/* IMAGE */}
        <label className="toolbar-btn cursor-pointer">
          🖼
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>
        {/* VIDEO */}
        <button
          onClick={handleVideo}
          className="toolbar-btn"
        >
          🎬
        </button>
      </div>
      {/* EDITOR */}
      <div className="
      border
      rounded-xl
      p-4
      bg-white
      min-h-[250px]
      shadow-sm
      ">
        <EditorContent editor={editor} />
      </div>
      {error && (
        <p className="
        text-red-500
        text-sm
        ">
          {error}
        </p>
      )}
      {/* BUTTONS */}
      <div className="
      flex
      justify-between
      pt-6
      ">
        <button
          onClick={prevStep}
          className="
          px-6
          py-3
          border
          rounded-xl
          "
        >
          Retour
        </button>
        <button
          onClick={handleNext}
          className="
          px-8
          py-3
          bg-indigo-500
          hover:bg-indigo-600
          text-white
          rounded-xl
          font-medium
          "
        >
          Continuer
        </button>
      </div>
    </div>
  );
}