# Student Performance Mobile App

Une application mobile React Native avec Expo pour permettre aux enseignants de visualiser les performances des étudiants dans différents domaines d'apprentissage.

## 🚀 Installation

### Prérequis

- Node.js (version 18 ou supérieure)
- Expo CLI (`npm install -g expo-cli`)
- Un émulateur Android/iOS ou l'app Expo Go sur votre téléphone

### Configuration du Backend (JSON Server)

1. Créez un fichier `db.json` dans un dossier séparé avec le contenu suivant :

```json
{
  "class_profile": {
    "strands": [
      {
        "strandId": "strand1",
        "strand": "Letter Identification",
        "workCovered": 70,
        "students": [
          {
            "studentId": "student1",
            "name": "John Doe",
            "competence": "ME"
          },
          {
            "studentId": "student2",
            "name": "Jane Smith",
            "competence": "AE"
          }
        ]
      },
      {
        "strandId": "strand2",
        "strand": "Letter Naming",
        "workCovered": 65,
        "students": [
          {
            "studentId": "student1",
            "name": "John Doe",
            "competence": "AE"
          },
          {
            "studentId": "student2",
            "name": "Jane Smith",
            "competence": "ME"
          }
        ]
      },
      {
        "strandId": "strand3",
        "strand": "Letter Formation",
        "workCovered": 45,
        "students": [
          {
            "studentId": "student1",
            "name": "John Doe",
            "competence": "BE"
          },
          {
            "studentId": "student2",
            "name": "Jane Smith",
            "competence": "ME"
          }
        ]
      },
      {
        "strandId": "strand4",
        "strand": "Phonemic Awareness",
        "workCovered": 80,
        "students": [
          {
            "studentId": "student1",
            "name": "John Doe",
            "competence": "EE"
          },
          {
            "studentId": "student2",
            "name": "Jane Smith",
            "competence": "AE"
          }
        ]
      }
    ]
  },
  "students": [
    {
      "id": "student1",
      "name": "John Doe",
      "strands": {
        "letterIdentification": {
          "competence": "ME",
          "progress": 75
        },
        "letterNaming": {
          "competence": "AE",
          "progress": 50
        },
        "letterFormation": {
          "competence": "BE",
          "progress": 30
        },
        "phonemicAwareness": {
          "competence": "EE",
          "progress": 90
        }
      }
    },
    {
      "id": "student2",
      "name": "Jane Smith",
      "strands": {
        "letterIdentification": {
          "competence": "AE",
          "progress": 60
        },
        "letterNaming": {
          "competence": "ME",
          "progress": 80
        },
        "letterFormation": {
          "competence": "ME",
          "progress": 75
        },
        "phonemicAwareness": {
          "competence": "AE",
          "progress": 55
        }
      }
    }
  ]
}
```

2. Installez et démarrez JSON Server :
```bash
npm install -g json-server
json-server --watch db.json --port 3000
```

### Installation de l'application

1. Clonez le projet et installez les dépendances :
```bash
npm install
```

2. Générez les types Tailwind (si nécessaire) :
```bash
npx tailwindcss init
```

3. Démarrez l'application :
```bash
npm start
```

## 📱 Utilisation

### Écran Principal (Class Performance Overview)
- **Recherche** : Utilisez la barre de recherche pour filtrer les étudiants
- **Mastery Key** : Panneau de référence toujours visible montrant les niveaux de compétence
- **Learning Strands** : Chaque domaine d'apprentissage affiche :
  - Le nom du domaine
  - Le pourcentage de travail couvert (avec barre de progression)
  - La liste des étudiants avec leurs niveaux de compétence
  - Navigation vers les détails en tapant sur un étudiant

### Écran de Détail Étudiant
- **Profil étudiant** : Nom et bouton de téléchargement de rapport
- **Performance détaillée** : Pour chaque domaine :
  - Niveau de compétence actuel (badge coloré)
  - Progression du travail (pourcentage et barre)
- **Résumé des performances** : Statistiques générales

## 🏗️ Architecture

### Technologies Utilisées
- **React Native** : Framework mobile
- **Expo** : Plateforme de développement
- **NativeWind** : Styling avec Tailwind CSS
- **React Navigation** : Navigation entre écrans
- **Zustand** : Gestion d'état globale
- **JSON Server** : API backend simulée

## 📋 API Endpoints

- `GET /class_profile` : Profil de classe avec domaines et étudiants
- `GET /students` : Liste détaillée des étudiants avec leurs performances

### Logs de Debug
```bash
# Voir les logs Expo
npx expo start --dev-client

# Logs du serveur
json-server --watch db.json --port 3000 --verbose
```

## 📝 Décisions de Design

1. **NativeWind** : Choisi pour la cohérence avec Tailwind CSS et la facilité de maintenance
2. **Zustand** : Store léger et simple pour la gestion d'état
3. **Couleurs sémantiques** : Configuration centralisée pour faciliter les changements de thème
4. **Composants modulaires** : Réutilisables et maintenables
5. **Gestion d'erreur robuste** : États de chargement et messages d'erreur clairs