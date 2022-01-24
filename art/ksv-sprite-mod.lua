local sprite = app.activeSprite

function findLayer(name)
  for i,layer in ipairs(app.activeSprite.layers) do
    if (layer.name == name) then
      return layer
    end
  end
end

-- Hide the shoppen layer
findLayer("kann").isVisible = false

-- find the hand-layer
local handLayer = findLayer("kasi")

-- move hand layer cel to a separate frame
sprite:newEmptyFrame(3)
sprite:newCel(handLayer, 3, handLayer:cel(2).image, handLayer:cel(2).position)
sprite:deleteCel(handLayer, 2)
