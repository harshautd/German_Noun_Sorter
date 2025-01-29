### **German Noun Sorter**  

#### **Description**  
This repository helps users **organize and categorize German nouns** based on their grammatical gender (**der, die, das**) and their **plural forms**. It reads a **Markdown file (`.md`)** containing a structured table of nouns and sorts them automatically using a JavaScript script.

---

#### **Features**  
✅ Parses a **Markdown table** with **noun, article, and plural form**  
✅ **Automatically sorts** nouns into **der, die, das** categories  
✅ **Displays the plural forms** for easy reference  
✅ Fetches the data dynamically from a **GitHub-hosted `.md` file**  
✅ Outputs the sorted nouns in the **console**  

---

#### **File Structure**  
```
📂 german-noun-sorter
│-- 📄 nouns.md           # Markdown file containing German nouns in table format
│-- 📄 script.js          # JavaScript script to fetch and process the nouns
│-- 📄 README.md          # Documentation about the project
```

---

#### **Usage**  
1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-username/german-noun-sorter.git
   ```
2. **Open the project in VS Code**  
   ```sh
   cd german-noun-sorter
   code .
   ```
3. **Run the script**  
   ```sh
   node script.js
   ```
4. **Modify `nouns.md`** to add more words, then push updates to GitHub.

---

#### **Example Input (nouns.md)**  
```md
| Noun  | Article | Plural  |
|--------|--------|--------|
| Hund   | der    | Hunde  |
| Katze  | die    | Katzen |
| Auto   | das    | Autos  |
| Tisch  | der    | Tische |
| Blume  | die    | Blumen |
| Buch   | das    | Bücher |
```

#### **Example Output (Console)**  
```sh
Sorted Nouns with Plurals:
der: Hund (Plural: Hunde), Tisch (Plural: Tische)
die: Katze (Plural: Katzen), Blume (Plural: Blumen)
das: Auto (Plural: Autos), Buch (Plural: Bücher)
```

---

#### **Future Enhancements**  
- 🖥️ **Web UI** to display the sorted nouns dynamically  
- 📌 **Search functionality** to quickly find words  
- 📋 **Export options** (CSV, JSON, PDF)  

---

