import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TimerValue } from "@/components/TimerValue";
import { Counter, Unit } from "@/Types/counter";
import { getUnit } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { INITIAL_COUNTER, TIMES } from "@/lib/constants";
import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

// const endDate = new Date("1/june/2025 2:00:00");

export const Route = createFileRoute("/$timer_id")({
  component: Timer,
});

function Timer() {
  const [counter, setCounter] = useState<Counter>(INITIAL_COUNTER);
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");

  const { timer_id } = Route.useParams();

  useEffect(() => {
    async function getTimer() {
      const { data, error } = await supabase
        .from("timers")
        .select()
        .eq("id", timer_id);

      setEndDate(data?.[0].end_date);
      setTitle(data?.[0].title);
      console.log({ data, error });
    }

    getTimer();
  }, [timer_id]);

  useEffect(() => {
    function updateTimer() {
      const now = Date.now();

      const counts: Counter = { ...INITIAL_COUNTER };
      Object.entries(TIMES).forEach(([key, value]) => {
        let diff = dayjs(endDate).diff(now, key as Unit);
        diff = value === 0 ? diff : diff % value;
        counts[key as Unit] = diff.toString().padStart(2, "0");
      });

      setCounter(counts);
    }

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [endDate]);

  const filteredCounter = Object.entries(counter);

  return (
    <>
      <main
        className={cn(
          "flex flex-col justify-center items-center playwrite-400 pb-8"
        )}
      >
        <p className="mb-6 text-xl md:text-2xl lg:text-3xl rubik">{title}</p>

        <div className="flex w-full flex-col gap-4 lg:gap-0 md:flex-row">
          {filteredCounter.map(([key, value], i) => (
            <div key={`${key}`} className="flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <TimerValue value={value} />
                <p className="md:translate-y-4 text-xl capitalize">
                  {getUnit(Number(value), key as Unit)}
                </p>
              </div>

              {i !== filteredCounter.length - 1 && (
                <p className="hidden md:flex justify-center items-center  text-5xl md:mx-3 lg:mx-6 -mt-10">
                  :
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Timer;
