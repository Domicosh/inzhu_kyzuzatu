import { createFileRoute } from "@tanstack/react-router";
import heroBg from "@/assets/8c49fce10cfc3c7e0289b81b1a14ec4f.jpg";
import { Ornament } from "@/components/Ornament";
import { Countdown } from "@/components/Countdown";
import { RsvpForm } from "@/components/RsvpForm";
import { Calendar } from "@/components/Calendar";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect } from "react";
import { startPetals } from "../effects/petals";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Інжу — Қыз ұзату тойы" },
      {
        name: "description",
        content:
          "Құрметті қонақтар! Қызымыз Інжудің қыз ұзату және сырға салу тойына шақырамыз. 21/08/2026, 17:00.",
      },
      { property: "og:title", content: "Інжу — Қыз ұзату тойы" },
      { property: "og:description", content: "21/08/2026, 17:00. Ақ тілектеріңізді арнауға шақырамыз." },
    ],
  }),
});


function Index() {
  useEffect(() => {
    const interval = startPetals();

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen bg-background">
      
      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            width={1024}
            height={1536}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-background/75" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="animate-float-in text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
            Қыз ұзату және сырға салу
          </p>

          <Ornament className="animate-float-in delay-1 mt-8" />

          <h1 className="animate-float-in delay-1 mt-8 text-7xl font-light italic leading-none text-foreground sm:text-9xl">
            Інжу
          </h1>

          <p className="animate-float-in delay-2 mt-10 text-lg font-light tracking-wide text-muted-foreground sm:text-xl">
           ҚҰРМЕТТІ АҒАЙЫН-ТУЫС, ҚҰДА-ЖЕКЖАТ, ДОС-ЖАРАН!
          </p>

          <p className="animate-float-in delay-2 mx-auto mt-6 max-w-lg text-base leading-relaxed text-foreground/85 sm:text-lg">
            Сіздерді қызымыз <span className="italic gold-text">Інжудің</span> қызымыздың
ақ босаға аттап, жаңа өмірге қадам басар
қасиетті Қыз Ұзату тойына арналған
ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.
          </p>

          <Ornament className="animate-float-in delay-3 mt-10" />

          <div className="animate-float-in delay-3 mt-10 flex items-center justify-center gap-8 sm:gap-14">
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Тамыз</div>
              <div className="mt-1 text-4xl font-light text-foreground sm:text-5xl">21</div>
            </div>
            <div className="h-16 w-px bg-[var(--gold-deep)]/40" />
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Уақыт</div>
              <div className="mt-1 text-4xl font-light text-foreground sm:text-5xl">17:00</div>
            </div>
            <div className="h-16 w-px bg-[var(--gold-deep)]/40" />
            <div className="text-center">
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Жыл</div>
              <div className="mt-1 text-4xl font-light text-foreground sm:text-5xl">2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* MESSAGE */}
      <ScrollAnimation type="fade-up" threshold={0.2}>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <Ornament className="mb-10" />
            <p className="text-xl font-light italic leading-relaxed text-foreground sm:text-2xl">
             Қызымыздың ақ босаға аттап,<br />
              жаңа өмірге қадам басар
              қуанышты сәтінде <br />
              <span className="gold-text">сіздермен бірге болу — біз үшін үлкен бақыт.</span>
            </p><br />
            <p className="text-xl font-light italic leading-relaxed text-foreground sm:text-2xl">
              Ақ дастарханымыздың қадірлі қонағы болып,<br />
              қуанышымызға ортақтасуға шақырамыз.<br />
              Ізгі ниет пен ақ баталарыңыз<br />
              <span className="gold-text">жас жұбайлардың жаңа өміріне</span><br />
              <span className="gold-text">шаттық пен береке сыйлайды деп сенеміз.</span><br />
            </p>
            
            <div className="mt-12 space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
                Той иелері<br />
                аяулы қыздарының бақыты мен<br /> 
                болашағын тілеген<br />
ардақты ата-анасы<br />
<p className="text-2xl font-light text-foreground sm:text-3xl"><br /> 
                Асхат<span className="gold-text">—</span>Қарлығаш
              </p>
              </p>
             
             
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* COUNTDOWN */}
      <ScrollAnimation type="scale" threshold={0.2}>
        <section className="px-6 py-20" style={{ background: "var(--gradient-elegant)" }}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
              Тойымызға қалды
            </p>
            <Ornament className="my-8" />
            <Countdown />
          </div>
        </section>
      </ScrollAnimation>

      {/* CALENDAR */}
      <ScrollAnimation type="fade-up" threshold={0.2}>
        <section className="px-6 py-24">
          <Calendar />
        </section>
      </ScrollAnimation>

      {/* ADDRESS */}
      <ScrollAnimation type="fade-up" threshold={0.2}>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
              Мекен-жайымыз
            </p>
            
            <Ornament className="my-8" />
            <p className="text-4xl font-light italic text-foreground sm:text-4xl">
              Жезказған қаласы, Кенгір селосы
            </p>
            <p className="text-4xl font-light italic text-foreground sm:text-4xl">
              Жібек жолы 46-1 көшесі
            </p>
          </div>
        </section>
      </ScrollAnimation>

      {/* RSVP */}
      <ScrollAnimation type="fade-up" threshold={0.2}>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--gold-deep)]">
                Анкета
              </p>
              <h2 className="mt-4 text-4xl font-light italic text-foreground sm:text-5xl">
                Құрметті қонақ
              </h2>
              <p className="mt-4 text-base italic text-muted-foreground">
                тойымызға қатысатыныңызды нақтылауыңызды сұраймыз<br /> 
                Сіздің жауабыңыз біз үшін маңызды.<br /> 
Қуанышымыздың қадірлі қонағы боласыз деп сенеміз<br /> 
              </p>
              <Ornament className="mt-8" />
            </div>

            <div
              className="mt-10 rounded-lg border border-[var(--gold)]/30 bg-card p-8 sm:p-10"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <RsvpForm />
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* FOOTER */}
      <ScrollAnimation type="fade-down" threshold={0.5}>
        <footer className="px-6 py-12 text-center">
          <Ornament className="mb-6" />
          <p className="text-sm italic text-muted-foreground">
            Сіздерді тойымызда көруге қуаныштымыз
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--gold-deep)]">
            21 · 08 · 2026
          </p>
        </footer>
      </ScrollAnimation>

      <MusicPlayer />
    </main>
  );
}
