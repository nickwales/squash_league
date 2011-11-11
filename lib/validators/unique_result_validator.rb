class UniqueResultValidator < ActiveModel::EachValidator
    def validate_each(record)
      p1 = a['results_attributes']['0']['user_id']
      p2 = a['results_attributes']['1']['user_id']
      b = [p1,p2]
     
      m = Result.joins(:match).where(:matches => {:playerdiv_id => 1})
      if 
      m.each do |match|
        c << match.user_id.to_s
      end
      
      if !c == b
        record.errors[:base] << "You have already played in this division"
      elsif !c == b.reverse
        record.errors[:base] << "You have already played in this division"
      end
    end
  end