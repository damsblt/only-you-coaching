#!/bin/bash

# Setup FFmpeg Lambda Layer (Simplified)
# Use a smaller ffmpeg build or alternative approach

set -e

LAYER_NAME="ffmpeg-simple"
REGION="eu-north-1"
FUNCTION_NAME="only-you-coaching-thumbnail-generator"

echo "🎬 Setting up FFmpeg Lambda Layer (Simplified)"
echo "=============================================="

# Create temporary directory
TEMP_DIR=$(mktemp -d)
cd $TEMP_DIR

echo "📥 Downloading minimal FFmpeg build..."
# Use a smaller ffmpeg build
curl -L -o ffmpeg.zip https://github.com/vot/ffbinaries-prebuilt/releases/download/v4.4.1/ffmpeg-4.4.1-linux-64.zip
unzip -q ffmpeg.zip

echo "📦 Creating layer structure..."
# Create layer directory structure
mkdir -p layer/bin
cp ffmpeg layer/bin/
chmod +x layer/bin/ffmpeg

# Create a simple ffprobe script that uses ffmpeg
cat > layer/bin/ffprobe << 'EOF'
#!/bin/bash
# Simple ffprobe replacement using ffmpeg
ffmpeg -i "$1" -f null - 2>&1 | grep Duration | sed 's/.*Duration: \([0-9:.]*\).*/\1/'
EOF
chmod +x layer/bin/ffprobe

echo "📋 Creating layer zip..."
cd layer
zip -r ../ffmpeg-layer.zip .
cd ..

echo "☁️  Publishing Lambda layer..."
LAYER_ARN=$(aws lambda publish-layer-version \
  --layer-name $LAYER_NAME \
  --description "Minimal FFmpeg for video processing" \
  --zip-file fileb://ffmpeg-layer.zip \
  --compatible-runtimes nodejs20.x \
  --query 'LayerVersionArn' \
  --output text)

echo "Layer ARN: $LAYER_ARN"

echo "🔧 Updating Lambda function with layer..."
aws lambda update-function-configuration \
  --function-name $FUNCTION_NAME \
  --layers $LAYER_ARN

echo "✅ FFmpeg layer setup complete!"
echo ""
echo "🧪 Test the function:"
echo "aws lambda invoke --function-name $FUNCTION_NAME --cli-binary-format raw-in-base64-out --payload file://test-payload.json response.json"

# Cleanup
cd /
rm -rf $TEMP_DIR

echo "🎉 FFmpeg layer is now active on your Lambda function!"

