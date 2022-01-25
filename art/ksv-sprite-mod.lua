local sprite = app.activeSprite

function findLayer(name)
  for i,layer in ipairs(app.activeSprite.layers) do
    if (layer.name == name) then
      return layer
    end
  end
end

function findTag(name)
  for i,tag in ipairs(app.activeSprite.tags) do
    if (tag.name == name) then
      return tag
    end
  end
end

-- Hide the shoppen layer
findLayer("kann").isVisible = false

-- find the hand-layer
local handLayer = findLayer("kasi")

-- move hand layer cel to a separate frame
drinkFrameNr = findTag("B").fromFrame.frameNumber
handFrameNr = drinkFrameNr + 1
sprite:newEmptyFrame(handFrameNr)
sprite:newCel(handLayer, handFrameNr, handLayer:cel(drinkFrameNr).image, handLayer:cel(drinkFrameNr).position)
sprite:deleteCel(handLayer, drinkFrameNr)
