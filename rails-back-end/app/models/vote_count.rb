module VoteCount

  def count_votes
    if self.votes.map { |vote| vote.value }.reduce(:+).nil?
      return 0
    else
      self.votes.map { |vote| vote.value }.reduce(:+)
    end
  end

end
