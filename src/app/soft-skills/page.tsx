/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import styles from "./page.module.css";

// Import predefined data
import checklist from "@/data/checklist";
import quiz from "@/data/quiz";
import tips from "@/data/tips";

export default function SoftSkillsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Assets
  const videos = [
    { title: "Active Listening", src: "/videos/active-listening.mp4" },
    { title: "Body Language", src: "/videos/body-language.mp4" },
    { title: "Clarity in Communication", src: "/videos/clarity-communication.mp4" },
    { title: "Eye Contact", src: "/videos/eye-contact.mp4" },
    { title: "Tone Control", src: "/videos/tone-control.mp4" },
  ];

  const images = [
    { title: "Communication", src: "/images/communication.png" },
    { title: "Communication Flow", src: "/images/communicationflow.png.jpg" },
    { title: "Confidence", src: "/images/confidence.png.jpg" },
    { title: "Confidence Booster", src: "/images/confidencebooster.png.jpg" },
    { title: "Top Mistakes", src: "/images/TopMistakeInterview.png" },
  ];

  const pdfs = [
    { title: "Interview Do’s and Don’ts", file: "/pdfs/InterviewDosandDonts.pdf" },
    { title: "Interview Guide", file: "/pdfs/InterviewGuide.pdf" },
    { title: "Interview Prep & Tips", file: "/pdfs/InterviewPrepandTips.pdf" },
    { title: "Soft Skills", file: "/pdfs/SoftSkill.pdf" },
    { title: "Soft Skills Workbook", file: "/pdfs/SoftskillsWorkbook.pdf" },
  ];

  const sections = [
    { id: "videos", title: "🎥 Videos" },
    { id: "images", title: "🖼️ Images" },
    { id: "pdfs", title: "📘 PDFs" },
    { id: "tips", title: "💡 Tips" },
    { id: "checklist", title: "✅ Checklist" },
    { id: "quiz", title: "📝 Quiz" },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      <h1 className={styles.mainHeading}>🌟 Soft Skills & Non-Verbal Dashboard</h1>

      {/* Dashboard view */}
      {!activeSection && (
        <div className={styles.dashboardGrid}>
          {sections.map((s) => (
            <div
              key={s.id}
              className={styles.card}
              onClick={() => setActiveSection(s.id)}
            >
              <h2>{s.title}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Section view */}
      {activeSection && (
        <div className={styles.sectionWrapper}>
          <button
            className={styles.backButton}
            onClick={() => {
              setActiveSection(null);
              setActiveImage(null);
            }}
          >
            ⬅ Back to Dashboard
          </button>

          {/* Videos */}
          {activeSection === "videos" && (
            <Section title="🎥 Training Videos">
              <div className={styles.sectionGrid}>
                {videos.map((v, i) => (
                  <div key={i} className={styles.subCard}>
                    <video src={v.src} className={styles.media} controls />
                    <h3>{v.title}</h3>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Images */}
          {activeSection === "images" && (
            <Section title="🖼️ Image Guidance">
              <div className={styles.sectionGrid}>
                {images.map((img, i) => (
                  <div
                    key={i}
                    className={styles.subCard}
                    onClick={() => setActiveImage(img.src)}
                  >
                    <img src={img.src} alt={img.title} className={styles.media} />
                    <h3>{img.title}</h3>
                  </div>
                ))}
              </div>

              {/* Image Popup */}
              {activeImage && (
                <div className={styles.modalOverlay} onClick={() => setActiveImage(null)}>
                  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <img src={activeImage} alt="Full View" className={styles.fullImage} />
                    <button className={styles.closeBtn} onClick={() => setActiveImage(null)}>
                      ❌ Close
                    </button>
                  </div>
                </div>
              )}
            </Section>
          )}

          {/* PDFs */}
          {activeSection === "pdfs" && (
            <Section title="📘 PDF Guidance">
              <div className={styles.sectionGrid}>
                {pdfs.map((p, i) => (
                  <div key={i} className={styles.subCard}>
                    <h3>{p.title}</h3>
                    <div className={styles.pdfBtns}>
                      {/* Open in new tab → Acrobat/Browser default viewer */}
                      <a href={p.file} target="_blank" className={styles.openBtn}>
                        📖 Open
                      </a>
                      <a href={p.file} className={styles.downloadBtn} download>
                        ⬇ Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Tips */}
          {activeSection === "tips" && (
            <Section title="💡 Daily Tips">
              <ul className={styles.tipsList}>
                {tips.map((tip, i) => (
                  <li key={i}>
                    <strong>{i + 1}.</strong> {tip}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Checklist */}
          {activeSection === "checklist" && (
            <Section title="✅ Checklist">
              <ul className={styles.checklist}>
                {checklist.map((item, i) => (
                  <li key={i}>
                    <input type="checkbox" /> {item}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Quiz */}
          {activeSection === "quiz" && (
            <Section title="📝 Self-Evaluation Quiz">
              <div className={styles.quizWrapper}>
                {quiz.map((q, i) => (
                  <Question key={i} q={q.q} options={q.options} answer={q.answer} />
                ))}
              </div>
            </Section>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------- Reusable Components -------------------------- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </div>
  );
}

function Question({ q, options, answer }: { q: string; options: string[]; answer: string }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className={styles.quizQuestion}>
      <h3>{q}</h3>
      {options.map((opt, i) => (
        <button
          key={i}
          className={`${styles.quizOption} ${
            selected === opt
              ? opt === answer
                ? styles.correct
                : styles.wrong
              : ""
          }`}
          onClick={() => setSelected(opt)}
        >
          {opt}
        </button>
      ))}
      {selected && (
        <p className={styles.feedback}>
          {selected === answer ? "✅ Correct!" : `❌ Wrong! Correct: ${answer}`}
        </p>
      )}
    </div>
  );
}


