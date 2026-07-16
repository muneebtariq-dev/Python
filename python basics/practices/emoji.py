msg = input(">> ")
words = msg.split(" ")

emoji_convertor = {
    ":)": "\U0001F642",
    ":(": "\U0001F641"
}

output = ""
for word in words:
    output += emoji_convertor.get(word, word) + " "
print(output)