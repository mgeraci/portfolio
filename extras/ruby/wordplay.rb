class String
  
  # splits a string into an array, alternating a sentence, it's punctuation
  def sentences
    $scan_array = gsub(/\n|\r/, ' ').gsub(/\s+/, ' ').split(/(\.\s*)|(\?\s*)/)
    y = $scan_array.length
    x = 0
    alternating_array = []
    while x < y
      alternating_array << $scan_array[x]
      x +=2
    end
    alternating_array
  end
  
  # splits words
  def words
    scan(/\w[\w\'\-]*/)
  end
end

class WordPlay
  
  # switch pronouns for spitting back sentences
  def self.switch_pronouns(text)
    text.gsub(/\b(I am|You are|I|You|Me|Your|My|Are you)\b/i) do |pronoun|
      case pronoun.downcase
        when "i"
          "you"
        when "you"
          "me"
        when "me"
          "you"
        when "i am"
          "you are"
        when "you are"
          "i am"
        when "your"
          "my"
        when "my"
          "your"
        when "are you"
          "am i"
      end
    end.sub(/^me\b/i, 'i').sub(/\./, '')
  end
  
  # takes the best sentence from a multisentence string based on length and number of 'hot words'
  def self.best_sentence(sentences, desired_words)
    ranked_sentences = sentences.sort_by do |s|
      s.words.length - (s.downcase.words - desired_words).length
    end
    ranked_sentences.last
  end
  
  # returns the type of sentence, can only be run after it has been split by sentence
  def self.sentence_type(text)
      array_position = $scan_array.index(text)
      array_position += 1
      punctuation = $scan_array[array_position]
      punctuation = punctuation.gsub(/\s+/, '')
      sentence_type = case punctuation
        when "."
          "statement"
        when "?"
          "question"
        when "!"
          "exclamation"
        else
          "statement"
      end
      sentence_type
   end 

   # adds an opener to a sentence
   def self.add_opener(text)
     openers = ["sure, ", "i'd agree that ", "ok, ", "uh huh, ", "whatever you say... ", "yeah, ", "yes, "]
     opener_number = rand(7)
     openers[opener_number] + text
   end
end