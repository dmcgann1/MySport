class Facility < ActiveRecord::Base
  include SearchFilterHelper

  has_many :reviews
  has_many :likes
  has_many :bookings

  def self.google_create(object)
    f = Facility.create!(
      name: object.name,
      formatted_phone_number: object.formatted_phone_number,
      formatted_address: object.formatted_address,
      rating: object.rating,
      website: object.website,
      identifier: object.id
    )

    photo = object.photos[0]

    if photo
      f.update(img_url: photo.fetch_url(800))
    else
      f.update(img_url: "http://www.aydindenge.com.tr/static/themes/default/no_photo.png?v=88621")
    end

    f
  end


  def self.filter_search(param)
    param.split.any?{ |word| FILTER_VALUES.include?(word) }
  end


  def self.identify_facility(identifier, id, reference)
    if self.where(identifier: identifier).exists?
      self.find_by_identifier(identifier)
    elsif self.where(id: id).exists?
      self.find(id)
    else
      self.google_create(CLIENT.spot(reference))
    end
  end

end
