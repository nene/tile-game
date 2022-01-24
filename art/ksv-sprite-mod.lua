local sprite = app.activeSprite

-- Hide the shoppen layer
for i,layer in ipairs(sprite.layers) do
  if (layer.name == "kann") then
    layer.isVisible = false
  end
end

-- find the hand-layer
local handLayer
for i,layer in ipairs(sprite.layers) do
  if (layer.name == "kasi") then
    handLayer = layer
  end
end

-- move hand layer cel to a separate frame
sprite:newEmptyFrame(3)
sprite:newCel(handLayer, 3, handLayer:cel(2).image, handLayer:cel(2).position)
sprite:deleteCel(handLayer, 2)
