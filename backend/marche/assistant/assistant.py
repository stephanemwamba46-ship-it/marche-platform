from openai import OpenAI
import os
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)
def ask_ai(user_message):
    try:
        completion = client.chat.completions.create(
            model="gpt-4.1-mini",
            messages=[
                {
                    "role": "system",
                    "content":
                    """
Tu es un assistant professionnel spécialisé dans la création de descriptions produits pour une marketplace.
Ton rôle est d'aider les vendeurs à :
- créer des descriptions produits professionnelles
- améliorer les descriptions existantes
- corriger les fautes d'orthographe
- utiliser des mots persuasifs
- structurer le texte clairement
- mettre en valeur les avantages du produit
- rendre le produit attractif pour les acheteurs
Si l'utilisateur donne une simple idée ou quelques mots,
tu dois créer une description complète et professionnelle.
La description doit :
- être claire
- persuasive
- bien structurée
- adaptée au commerce en ligne
- facile à lire
- attrayante
Tu peux ajouter :
- introduction
- points forts du produit
- conclusion marketing
"""
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ],
            temperature=0.7
        )
        return completion.choices[0].message.content
    except Exception as e:
        return str(e)