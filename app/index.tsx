import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface Timer {
  id: number;
  name: string;
  color: string;
  time: number; // Ahora guardará centésimas de segundo
  running: boolean;
  interval: NodeJS.Timeout | number | null;
}

export default function HomeScreen() {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [count, setCount] = useState(1);
  const [maxTimeTimer, setMaxTimeTimer] = useState<number | null>(null);

  useEffect(() => {
    updateMaxTimeTimer();
  }, [timers]);

  const updateMaxTimeTimer = () => {
    const maxTime = Math.max(...timers.map(t => t.time));
    const maxId = timers.find(t => t.time === maxTime)?.id ?? null;
    setMaxTimeTimer(maxId);
  };

  const addTimer = () => {
    if (timers.length >= 10) return;
    setTimers([
      ...timers,
      {
        id: Date.now(),
        name: `Cronómetro ${count}`,
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
        time: 0,
        running: false,
        interval: null,
      }
    ]);
    setCount(count + 1);
  };

  const startAll = () => {
    const newTimers = timers.map(timer => {
      if (!timer.running) {
        return {
          ...timer,
          running: true,
          interval: setInterval(() => {
            setTimers(prev =>
              prev.map(t =>
                t.id === timer.id && t.running
                  ? { ...t, time: t.time + 1 }
                  : t
              )
            );
          }, 10) // Cambiado a 10ms para centésimas
        };
      }
      return timer;
    });
    setTimers(newTimers);
  };

  const stopOne = (id: number) => {
    const newTimers = timers.map(timer => {
      if (timer.id === id && timer.running) {
        clearInterval(timer.interval!);
        return { ...timer, running: false, interval: null };
      }
      return timer;
    });
    setTimers(newTimers);
  };

  const resetAll = () => {
    timers.forEach(timer => timer.interval && clearInterval(timer.interval));
    const resetTimers = timers.map(timer => ({
      ...timer,
      time: 0,
      running: false,
      interval: null
    }));
    setTimers(resetTimers);
  };

  const updateTimer = (id: number, field: keyof Timer, value: string) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, [field]: value } : timer
    ));
  };

  const deleteTimer = (id: number) => {
    const timer = timers.find(t => t.id === id);
    if (timer?.interval) clearInterval(timer.interval);
    setTimers(timers.filter(t => t.id !== id));
  };

  const toggleTimer = (id: number) => {
    const timer = timers.find(t => t.id === id);
    if (!timer) return;

    if (timer.running) {
      stopOne(id);
    } else {
      const interval = setInterval(() => {
        setTimers(prev =>
          prev.map(t =>
            t.id === id ? { ...t, time: t.time + 1 } : t
          )
        );
      }, 10);
      setTimers(prev =>
        prev.map(t =>
          t.id === id ? { ...t, running: true, interval } : t
        )
      );
    }
  };

  const getRankingEmoji = (position: number): string => {
    switch (position) {
      case 1: return '🥇 ';
      case 2: return '🥈 ';
      case 3: return '🥉 ';
      default: return `${position}. `;
    }
  };

  const getSortedTimers = () => {
    // Filtramos los timers con tiempo 0 para que aparezcan al final
    const activeTimers = timers.filter(t => t.time > 0);
    const zeroTimers = timers.filter(t => t.time === 0);
    
    // Ordenamos los timers activos de menor a mayor tiempo
    const sortedActive = activeTimers.sort((a, b) => a.time - b.time);
    
    // Concatenamos los timers con tiempo 0 al final
    return [...sortedActive, ...zeroTimers];
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Cronómetros</ThemedText>
      <Button title="➕ Añadir cronómetro" onPress={addTimer} disabled={timers.length >= 10} />
      <Button title="▶️ Iniciar todos" onPress={startAll} />
      <Button title="🔁 Resetear todos" onPress={resetAll} />

      <ScrollView style={styles.scrollView}>
        {getSortedTimers().map((timer, index) => (
          <ThemedView 
            key={timer.id} 
            style={[
              styles.timerBox, 
              { borderColor: timer.color }
            ]}
          >
            <View style={styles.rankingContainer}>
              <ThemedText style={[styles.rankingText, { color: timer.color }]}>
                {getRankingEmoji(index + 1)}
              </ThemedText>
              <TextInput
                style={[styles.nameInput, { color: timer.color }]}
                value={timer.name}
                onChangeText={text => updateTimer(timer.id, 'name', text)}
              />
            </View>
            <ThemedText style={[styles.timeText, { color: timer.color }]}>
              {Math.floor(timer.time / 100)}:{String(Math.floor((timer.time % 100))).padStart(2, '0')}
            </ThemedText>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => toggleTimer(timer.id)}>
                <ThemedText style={[styles.button, { borderColor: timer.color, color: timer.color }]}>
                  {timer.running ? '⏸ Pausar' : '▶️ Reanudar'}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTimer(timer.id)}>
                <ThemedText style={[styles.button, { borderColor: timer.color, color: timer.color }]}>
                  🗑️ Borrar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, // Más espacio arriba
  },
  scrollView: {
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  nameInput: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rankingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rankingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  maxTimeBox: {
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
