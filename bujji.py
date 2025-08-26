import speech_recognition as sr
import pyttsx3
import datetime
import random

# Initialize the recognizer and text-to-speech engine
recognizer = sr.Recognizer()
tts_engine = pyttsx3.init()

def speak(text):
    """Converts text to speech."""
    tts_engine.say(text)
    tts_engine.runAndWait()

def listen(source):
    """Listens for audio and returns the recognized text."""
    print("Listening...")
    recognizer.adjust_for_ambient_noise(source)
    audio = recognizer.listen(source)
    try:
        text = recognizer.recognize_google(audio).lower()
        print(f"You said: {text}")
        return text
    except sr.UnknownValueError:
        return None
    except sr.RequestError:
        speak("Sorry, my speech service is down.")
        return None

def main():
    """Main function to run the voice assistant."""
    speak("Bujji at your service.")

    with sr.Microphone() as source:
        while True:
            print("\nWaiting for wake word 'Bujji'...")
            text = listen(source)

            if text and "bujji" in text:
                speak("Yes?")
                command = listen(source)

                if command:
                    if "hello" in command:
                        speak("Hello there!")
                    elif "what is the time" in command:
                        now = datetime.datetime.now().strftime("%I:%M %p")
                        speak(f"The current time is {now}.")
                    elif "tell me a joke" in command:
                        jokes = [
                            "Why don't scientists trust atoms? Because they make up everything!",
                            "What do you call a fake noodle? An Impasta!",
                            "Why did the scarecrow win an award? Because he was outstanding in his field!",
                        ]
                        speak(random.choice(jokes))
                    elif "goodbye" in command or "exit" in command:
                        speak("Goodbye!")
                        break
                    else:
                        speak("I am not sure how to help with that yet.")

if __name__ == "__main__":
    main()
