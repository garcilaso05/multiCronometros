import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [timers, setTimers] = useState([]);
  const [count, setCount] = useState(1);

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
          }, 1000)
        };
      }
      return timer;
    });
    setTimers(newTimers);
  };

  const stopOne = (id) => {
    const newTimers = timers.map(timer => {
      if (timer.id === id && timer.running) {
        clearInterval(timer.interval);
        return { ...timer, running: false, interval: null };
      }
      return timer;
    });
    setTimers(newTimers);
  };

  const resetAll = () => {
    timers.forEach(timer => clearInterval(timer.interval));
    const resetTimers = timers.map(timer => ({
      ...timer,
      time: 0,
      running: false,
      interval: null
    }));
    setTimers(resetTimers);
  };

  const updateTimer = (id, field, value) => {
    setTimers(timers.map(timer =>
      timer.id === id ? { ...timer, [field]: value } : timer
    ));
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#111' }}>
      <Text style={styles.header}>Cronómetros</Text>
      <Button title="➕ Añadir cronómetro" onPress={addTimer} disabled={timers.length >= 10} />
      <Button title="▶️ Iniciar todos" onPress={startAll} />
      <Button title="🔁 Resetear todos" onPress={resetAll} />

      <ScrollView style={{ marginTop: 20 }}>
        {timers.map((timer) => (
          <View key={timer.id} style={[styles.timerBox, { borderColor: timer.color }]}>
            <TextInput
              style={[styles.nameInput, { color: timer.color }]}
              value={timer.name}
              onChangeText={text => updateTimer(timer.id, 'name', text)}
            />
            <TextInput
              style={[styles.colorInput, { color: timer.color }]}
              value={timer.color}
              onChangeText={text => updateTimer(timer.id, 'color', text)}
            />
            <Text style={[styles.timeText, { color: timer.color }]}>
              {Math.floor(timer.time / 60)}m {timer.time % 60}s
            </Text>
            <TouchableOpacity onPress={() => stopOne(timer.id)}>
              <Text style={[styles.stopButton, { borderColor: timer.color, color: timer.color }]}>⏹ Detener</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerBox: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#222',
  },
  nameInput: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  colorInput: {
    fontSize: 14,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stopButton: {
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
