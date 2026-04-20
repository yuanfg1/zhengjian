// 获取DOM元素
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const photoSize = document.getElementById('photoSize');
const paperSize = document.getElementById('paperSize');
const layout = document.getElementById('layout');
const customLayoutGroup = document.getElementById('customLayoutGroup');
const colsInput = document.getElementById('cols');
const rowsInput = document.getElementById('rows');
const horizontalSpacing = document.getElementById('horizontalSpacing');
const horizontalSpacingValue = document.getElementById('horizontalSpacingValue');
const horizontalSpacingMinus = document.getElementById('horizontalSpacingMinus');
const horizontalSpacingPlus = document.getElementById('horizontalSpacingPlus');
const verticalSpacing = document.getElementById('verticalSpacing');
const verticalSpacingValue = document.getElementById('verticalSpacingValue');
const verticalSpacingMinus = document.getElementById('verticalSpacingMinus');
const verticalSpacingPlus = document.getElementById('verticalSpacingPlus');
const generateBtn = document.getElementById('generateBtn');
const resultCanvas = document.getElementById('resultCanvas');
const downloadBtn = document.getElementById('downloadBtn');
const printBtn = document.getElementById('printBtn');
const rotateLeftBtn = document.getElementById('rotateLeftBtn');
const rotateRightBtn = document.getElementById('rotateRightBtn');

// 全局变量
let uploadedImage = null;
let rotation = 0;

// 水平间距调整事件监听
horizontalSpacing.addEventListener('input', function() {
    horizontalSpacingValue.textContent = `${this.value}mm`;
});

// 垂直间距调整事件监听
verticalSpacing.addEventListener('input', function() {
    verticalSpacingValue.textContent = `${this.value}mm`;
});

// 水平间距按钮点击事件
horizontalSpacingMinus.addEventListener('click', function() {
    let value = parseInt(horizontalSpacing.value);
    if (value > 0) {
        value--;
        horizontalSpacing.value = value;
        horizontalSpacingValue.textContent = `${value}mm`;
        horizontalSpacing.dispatchEvent(new Event('change'));
    }
});

horizontalSpacingPlus.addEventListener('click', function() {
    let value = parseInt(horizontalSpacing.value);
    if (value < 20) {
        value++;
        horizontalSpacing.value = value;
        horizontalSpacingValue.textContent = `${value}mm`;
        horizontalSpacing.dispatchEvent(new Event('change'));
    }
});

// 垂直间距按钮点击事件
verticalSpacingMinus.addEventListener('click', function() {
    let value = parseInt(verticalSpacing.value);
    if (value > 0) {
        value--;
        verticalSpacing.value = value;
        verticalSpacingValue.textContent = `${value}mm`;
        verticalSpacing.dispatchEvent(new Event('change'));
    }
});

verticalSpacingPlus.addEventListener('click', function() {
    let value = parseInt(verticalSpacing.value);
    if (value < 20) {
        value++;
        verticalSpacing.value = value;
        verticalSpacingValue.textContent = `${value}mm`;
        verticalSpacing.dispatchEvent(new Event('change'));
    }
});

// 鼠标滚轮调整间距
function setupWheelAdjustment() {
    // 水平间距滚轮调整
    horizontalSpacing.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加间距
            if (value < 20) {
                value++;
            }
        } else {
            // 向下滚动，减少间距
            if (value > 0) {
                value--;
            }
        }
        this.value = value;
        horizontalSpacingValue.textContent = `${value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    // 垂直间距滚轮调整
    verticalSpacing.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加间距
            if (value < 20) {
                value++;
            }
        } else {
            // 向下滚动，减少间距
            if (value > 0) {
                value--;
            }
        }
        this.value = value;
        verticalSpacingValue.textContent = `${value}mm`;
        this.dispatchEvent(new Event('change'));
    });
}

// 初始化鼠标滚轮调整
setupWheelAdjustment();

// 为行列数添加鼠标滚轮调整
function setupRowColWheelAdjustment() {
    // 列数滚轮调整
    colsInput.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加列数
            if (value < 10) {
                value++;
            }
        } else {
            // 向下滚动，减少列数
            if (value > 1) {
                value--;
            }
        }
        this.value = value;
        this.dispatchEvent(new Event('change'));
    });
    
    // 行数滚轮调整
    rowsInput.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加行数
            if (value < 10) {
                value++;
            }
        } else {
            // 向下滚动，减少行数
            if (value > 1) {
                value--;
            }
        }
        this.value = value;
        this.dispatchEvent(new Event('change'));
    });
}

// 初始化行列数鼠标滚轮调整
setupRowColWheelAdjustment();

// 更新预览图片
function updatePreview() {
    if (uploadedImage) {
        previewImage.src = uploadedImage.src;
        previewImage.style.transform = `rotate(${rotation}deg)`;
        
        // 调整预览框大小以适应旋转后的照片
        adjustPreviewContainer();
    }
}

// 调整预览框大小
function adjustPreviewContainer() {
    const previewContainer = document.querySelector('.preview-container');
    const angle = rotation % 360;
    
    // 当旋转90度或270度时，交换预览框的宽高
    if (angle === 90 || angle === 270) {
        previewContainer.style.width = '400px';
        previewContainer.style.height = '300px';
    } else {
        previewContainer.style.width = '300px';
        previewContainer.style.height = '400px';
    }
}

// 旋转按钮点击事件
rotateLeftBtn.addEventListener('click', function() {
    rotation = (rotation - 90 + 360) % 360;
    updatePreview();
    adjustSpacingForRotation();
    generateLayout();
});

rotateRightBtn.addEventListener('click', function() {
    rotation = (rotation + 90) % 360;
    updatePreview();
    adjustSpacingForRotation();
    generateLayout();
});

// 根据旋转角度调整间距
function adjustSpacingForRotation() {
    // 移除将间距设置为零的代码，改为通过调整照片排列逻辑来实现紧凑效果
    // 这样可以保持用户设置的间距值，同时确保照片紧凑排列
}

// 排列方式选择事件
layout.addEventListener('change', function() {
    if (this.value === 'custom') {
        customLayoutGroup.style.display = 'block';
    } else {
        customLayoutGroup.style.display = 'none';
    }
});



// 初始化排列方式
layout.dispatchEvent(new Event('change'));

// 文件上传处理
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                uploadedImage = img;
                rotation = 0; // 重置旋转角度
                updatePreview();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 生成排版
function generateLayout() {
    if (!uploadedImage) {
        return;
    }
    
    // 获取选项值
    const selectedPhotoSize = photoSize.value;
    const selectedPaperSize = paperSize.value;
    const selectedLayout = layout.value;
    const selectedHorizontalSpacing = parseInt(horizontalSpacing.value);
    const selectedVerticalSpacing = parseInt(verticalSpacing.value);
    
    // 计算尺寸（单位：mm）
    const photoDimensions = selectedPhotoSize.split('x').map(Number);
    let paperDimensions;
    switch(selectedPaperSize) {
        case 'a4':
            paperDimensions = [210, 297];
            break;
        case 'a3':
            paperDimensions = [297, 420];
            break;
        case '6inch':
            paperDimensions = [152, 102];
            break;
        case '5inch':
            paperDimensions = [127, 89];
            break;
        case '4inch':
            paperDimensions = [102, 76];
            break;
        default:
            paperDimensions = [210, 297];
    }
    
    // 处理排列方式
    let layoutDimensions;
    if (selectedLayout === 'custom') {
        const cols = parseInt(colsInput.value);
        const rows = parseInt(rowsInput.value);
        layoutDimensions = [cols, rows];
    } else {
        layoutDimensions = selectedLayout.split('x').map(Number);
    }
    
    // 转换为像素（假设300dpi）
    const dpi = 300;
    const mmToPx = (mm) => (mm / 25.4) * dpi;
    
    const photoWidth = mmToPx(photoDimensions[0]);
    const photoHeight = mmToPx(photoDimensions[1]);
    const paperWidth = mmToPx(paperDimensions[0]);
    const paperHeight = mmToPx(paperDimensions[1]);
    const cols = layoutDimensions[0];
    const rows = layoutDimensions[1];
    
    // 设置Canvas尺寸
    resultCanvas.width = paperWidth;
    resultCanvas.height = paperHeight;
    
    const ctx = resultCanvas.getContext('2d');
    
    // 绘制白色背景
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, paperWidth, paperHeight);
    
    // 计算间距
    const horizontalSpacingPx = mmToPx(selectedHorizontalSpacing);
    const verticalSpacingPx = mmToPx(selectedVerticalSpacing);
    const totalPhotoWidth = cols * photoWidth + (cols - 1) * horizontalSpacingPx;
    const totalPhotoHeight = rows * photoHeight + (rows - 1) * verticalSpacingPx;
    const horizontalMargin = (paperWidth - totalPhotoWidth) / 2;
    const verticalMargin = (paperHeight - totalPhotoHeight) / 2;
    
    // 绘制照片
    function drawPhotos() {
        // 计算旋转后的照片实际占用空间
        const angle = rotation % 360;
        let effectiveWidth, effectiveHeight;
        
        if (angle === 90 || angle === 270) {
            // 横向照片，交换宽高
            effectiveWidth = photoHeight;
            effectiveHeight = photoWidth;
        } else {
            // 纵向照片，保持原宽高
            effectiveWidth = photoWidth;
            effectiveHeight = photoHeight;
        }
        
        // 重新计算总宽度和高度，以及边距
        const totalWidth = cols * effectiveWidth + (cols - 1) * horizontalSpacingPx;
        const totalHeight = rows * effectiveHeight + (rows - 1) * verticalSpacingPx;
        const adjustedHorizontalMargin = (paperWidth - totalWidth) / 2;
        const adjustedVerticalMargin = (paperHeight - totalHeight) / 2;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // 计算照片的位置，考虑旋转后的实际尺寸
                const x = adjustedHorizontalMargin + col * (effectiveWidth + horizontalSpacingPx);
                const y = adjustedVerticalMargin + row * (effectiveHeight + verticalSpacingPx);
                
                // 保存当前状态
                ctx.save();
                
                // 移动到照片中心
                ctx.translate(x + effectiveWidth / 2, y + effectiveHeight / 2);
                
                // 应用旋转
                ctx.rotate((rotation * Math.PI) / 180);
                
                // 绘制旋转后的照片边框
                ctx.strokeStyle = '#dddddd';
                ctx.lineWidth = 1;
                ctx.strokeRect(-photoWidth / 2, -photoHeight / 2, photoWidth, photoHeight);
                
                // 绘制照片（保持比例）
                const scale = Math.min(photoWidth / uploadedImage.width, photoHeight / uploadedImage.height);
                const imgWidth = uploadedImage.width * scale;
                const imgHeight = uploadedImage.height * scale;
                ctx.drawImage(uploadedImage, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
                
                // 恢复原始状态
                ctx.restore();
            }
        }
    }
    
    drawPhotos();
    
    // 启用下载和打印按钮
    downloadBtn.disabled = false;
    printBtn.disabled = false;
}

// 生成排版按钮点击事件
generateBtn.addEventListener('click', generateLayout);

// 实时浏览功能 - 当参数变化时自动更新排版
function setupRealTimePreview() {
    const elementsToWatch = [photoSize, paperSize, layout, colsInput, rowsInput, horizontalSpacing, verticalSpacing];
    elementsToWatch.forEach(element => {
        element.addEventListener('change', generateLayout);
    });
    
    // 旋转按钮点击事件也触发排版更新
    rotateLeftBtn.addEventListener('click', generateLayout);
    rotateRightBtn.addEventListener('click', generateLayout);
}

// 初始化实时浏览
setupRealTimePreview();

// 下载排版
function downloadCanvas() {
    const link = document.createElement('a');
    link.download = '证件照排版.png';
    link.href = resultCanvas.toDataURL('image/png');
    link.click();
}

// 检查Canvas是否有内容
function isCanvasEmpty() {
    const ctx = resultCanvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        if (data[i] !== 255 || data[i + 1] !== 255 || data[i + 2] !== 255 || data[i + 3] !== 255) {
            return false;
        }
    }
    return true;
}

// 下载按钮点击事件
downloadBtn.addEventListener('click', function() {
    if (isCanvasEmpty()) {
        alert('请先生成排版');
        return;
    }
    downloadCanvas();
});

// 打印功能
function printCanvas() {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>证件照排版</title>');
    printWindow.document.write('<style>body { margin: 0; padding: 0; text-align: center; } img { max-width: 100%; max-height: 100%; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<img src="' + resultCanvas.toDataURL('image/png') + '" />');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// 打印按钮点击事件
printBtn.addEventListener('click', function() {
    if (isCanvasEmpty()) {
        alert('请先生成排版');
        return;
    }
    printCanvas();
});

// 初始化按钮为禁用状态
downloadBtn.disabled = true;
printBtn.disabled = true;