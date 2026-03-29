"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/date";

// Placeholder workout data — replace with real data fetching later
const MOCK_WORKOUTS = [
  {
    id: "1",
    name: "Back Squat",
    sets: 4,
    reps: 5,
    weight: 120,
    unit: "kg",
  },
  {
    id: "2",
    name: "Romanian Deadlift",
    sets: 3,
    reps: 8,
    weight: 100,
    unit: "kg",
  },
  {
    id: "3",
    name: "Leg Press",
    sets: 3,
    reps: 12,
    weight: 200,
    unit: "kg",
  },
];

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className="flex flex-1 flex-col gap-6 px-6 py-8 max-w-4xl mx-auto w-full">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDate(selectedDate)}
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Date picker */}
        <Card className="shrink-0">
          <CardContent className="p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) setSelectedDate(date);
              }}
            />
          </CardContent>
        </Card>

        {/* Workout list */}
        <div className="flex flex-1 flex-col gap-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Workouts logged
          </h2>

          {MOCK_WORKOUTS.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                No workouts logged for this day.
              </CardContent>
            </Card>
          ) : (
            MOCK_WORKOUTS.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{workout.name}</CardTitle>
                    <Badge variant="secondary">
                      {workout.weight} {workout.unit}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {workout.sets} sets &times; {workout.reps} reps
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
