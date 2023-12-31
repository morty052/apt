import { AVPlaybackSource, Audio } from "expo-av";
import React, { useEffect, useState } from "react";

const useSound = (soundFile: AVPlaybackSource) => {
  const [sound, setSound] = useState<null | Audio.Sound>(null);

  useEffect(() => {
    const loadSound = async () => {
      const { sound: soundObject } = await Audio.Sound.createAsync(soundFile);
      setSound(soundObject);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundFile]);

  const play = async () => {
    try {
      if (sound) {
        await sound.replayAsync();
        console.log("now playing sound");
      } else throw "something went wrong";
    } catch (error) {
      console.log(error);
    }
  };

  return { play };
};

export default useSound;
