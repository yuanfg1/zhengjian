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
const alignment = document.getElementById('alignment');
const margin = document.getElementById('margin');
const marginValue = document.getElementById('marginValue');
const marginMinus = document.getElementById('marginMinus');
const marginPlus = document.getElementById('marginPlus');
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

// 页边距调整事件监听
margin.addEventListener('input', function() {
    marginValue.textContent = `${this.value}mm`;
});

// 页边距按钮点击事件
marginMinus.addEventListener('click', function() {
    let value = parseInt(margin.value);
    if (value > 0) {
        value--;
        margin.value = value;
        marginValue.textContent = `${value}mm`;
        margin.dispatchEvent(new Event('change'));
    }
});

marginPlus.addEventListener('click', function() {
    let value = parseInt(margin.value);
    if (value < 50) {
        value++;
        margin.value = value;
        marginValue.textContent = `${value}mm`;
        margin.dispatchEvent(new Event('change'));
    }
});

// 页边距鼠标滚轮调整
margin.addEventListener('wheel', function(e) {
    e.preventDefault();
    let value = parseInt(this.value);
    if (e.deltaY < 0) {
        // 向上滚动，增加页边距
        if (value < 50) {
            value++;
        }
    } else {
        // 向下滚动，减少页边距
        if (value > 0) {
            value--;
        }
    }
    this.value = value;
    marginValue.textContent = `${value}mm`;
    this.dispatchEvent(new Event('change'));
});

// 初始化行列数鼠标滚轮调整
setupRowColWheelAdjustment();

// 初始化切割线调整控件
function setupCuttingLineAdjustment() {
    const cuttingLineHorizontal = document.getElementById('cuttingLineHorizontal');
    const cuttingLineVertical = document.getElementById('cuttingLineVertical');
    const cuttingLineHorizontalValue = document.getElementById('cuttingLineHorizontalValue');
    const cuttingLineVerticalValue = document.getElementById('cuttingLineVerticalValue');
    
    // 切割线水平调整
    cuttingLineHorizontal.addEventListener('input', function() {
        cuttingLineHorizontalValue.textContent = `${this.value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    // 切割线垂直调整
    cuttingLineVertical.addEventListener('input', function() {
        cuttingLineVerticalValue.textContent = `${this.value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    // 切割线水平调整按钮
    document.getElementById('cuttingLineHorizontalMinus').addEventListener('click', function() {
        let value = parseInt(cuttingLineHorizontal.value);
        if (value > -10) {
            value--;
            cuttingLineHorizontal.value = value;
            cuttingLineHorizontalValue.textContent = `${value}mm`;
            cuttingLineHorizontal.dispatchEvent(new Event('change'));
        }
    });
    
    document.getElementById('cuttingLineHorizontalPlus').addEventListener('click', function() {
        let value = parseInt(cuttingLineHorizontal.value);
        if (value < 10) {
            value++;
            cuttingLineHorizontal.value = value;
            cuttingLineHorizontalValue.textContent = `${value}mm`;
            cuttingLineHorizontal.dispatchEvent(new Event('change'));
        }
    });
    
    // 切割线垂直调整按钮
    document.getElementById('cuttingLineVerticalMinus').addEventListener('click', function() {
        let value = parseInt(cuttingLineVertical.value);
        if (value > -10) {
            value--;
            cuttingLineVertical.value = value;
            cuttingLineVerticalValue.textContent = `${value}mm`;
            cuttingLineVertical.dispatchEvent(new Event('change'));
        }
    });
    
    document.getElementById('cuttingLineVerticalPlus').addEventListener('click', function() {
        let value = parseInt(cuttingLineVertical.value);
        if (value < 10) {
            value++;
            cuttingLineVertical.value = value;
            cuttingLineVerticalValue.textContent = `${value}mm`;
            cuttingLineVertical.dispatchEvent(new Event('change'));
        }
    });
    
    // 添加鼠标滚轮调整
    cuttingLineHorizontal.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加水平调整
            if (value < 10) {
                value++;
            }
        } else {
            // 向下滚动，减少水平调整
            if (value > -10) {
                value--;
            }
        }
        this.value = value;
        cuttingLineHorizontalValue.textContent = `${value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    cuttingLineVertical.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加垂直调整
            if (value < 10) {
                value++;
            }
        } else {
            // 向下滚动，减少垂直调整
            if (value > -10) {
                value--;
            }
        }
        this.value = value;
        cuttingLineVerticalValue.textContent = `${value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    // 切割线间距调整
    const cuttingLineSpacing = document.getElementById('cuttingLineSpacing');
    const cuttingLineSpacingValue = document.getElementById('cuttingLineSpacingValue');
    
    cuttingLineSpacing.addEventListener('input', function() {
        cuttingLineSpacingValue.textContent = `${this.value}mm`;
        this.dispatchEvent(new Event('change'));
    });
    
    // 切割线间距调整按钮
    document.getElementById('cuttingLineSpacingMinus').addEventListener('click', function() {
        let value = parseInt(cuttingLineSpacing.value);
        if (value > 0) {
            value--;
            cuttingLineSpacing.value = value;
            cuttingLineSpacingValue.textContent = `${value}mm`;
            cuttingLineSpacing.dispatchEvent(new Event('change'));
        }
    });
    
    document.getElementById('cuttingLineSpacingPlus').addEventListener('click', function() {
        let value = parseInt(cuttingLineSpacing.value);
        if (value < 10) {
            value++;
            cuttingLineSpacing.value = value;
            cuttingLineSpacingValue.textContent = `${value}mm`;
            cuttingLineSpacing.dispatchEvent(new Event('change'));
        }
    });
    
    // 添加鼠标滚轮调整
    cuttingLineSpacing.addEventListener('wheel', function(e) {
        e.preventDefault();
        let value = parseInt(this.value);
        if (e.deltaY < 0) {
            // 向上滚动，增加间距
            if (value < 10) {
                value++;
            }
        } else {
            // 向下滚动，减少间距
            if (value > 0) {
                value--;
            }
        }
        this.value = value;
        cuttingLineSpacingValue.textContent = `${value}mm`;
        this.dispatchEvent(new Event('change'));
    });
}

// 初始化切割线调整
setupCuttingLineAdjustment();

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
    
    // 获取对齐方式和页边距
    const selectedAlignment = alignment.value;
    const selectedMargin = parseInt(margin.value);
    const marginPx = mmToPx(selectedMargin);
    
    // 计算间距
    const horizontalSpacingPx = mmToPx(selectedHorizontalSpacing);
    const verticalSpacingPx = mmToPx(selectedVerticalSpacing);
    const totalPhotoWidth = cols * photoWidth + (cols - 1) * horizontalSpacingPx;
    const totalPhotoHeight = rows * photoHeight + (rows - 1) * verticalSpacingPx;
    
    // 根据对齐方式计算边距，确保四周都有页边距
    let horizontalMargin, verticalMargin;
    // 计算可用空间（减去四周的页边距）
    const availableWidth = paperWidth - 2 * marginPx;
    const availableHeight = paperHeight - 2 * marginPx;
    
    switch(selectedAlignment) {
        case 'center':
            // 居中对齐
            horizontalMargin = marginPx + (availableWidth - totalPhotoWidth) / 2;
            verticalMargin = marginPx + (availableHeight - totalPhotoHeight) / 2;
            break;
        case 'left':
            // 左对齐
            horizontalMargin = marginPx; // 左侧留用户设置的页边距
            verticalMargin = marginPx + (availableHeight - totalPhotoHeight) / 2;
            break;
        case 'right':
            // 右对齐
            horizontalMargin = paperWidth - totalPhotoWidth - marginPx; // 右侧留用户设置的页边距
            verticalMargin = marginPx + (availableHeight - totalPhotoHeight) / 2;
            break;
        case 'corner':
            // 角落对齐（左上角）
            horizontalMargin = marginPx; // 左侧留用户设置的页边距
            verticalMargin = marginPx; // 顶部留用户设置的页边距
            break;
        default:
            // 默认居中对齐
            horizontalMargin = marginPx + (availableWidth - totalPhotoWidth) / 2;
            verticalMargin = marginPx + (availableHeight - totalPhotoHeight) / 2;
    }
    
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
        
        // 重新计算总宽度和高度
        const totalWidth = cols * effectiveWidth + (cols - 1) * horizontalSpacingPx;
        const totalHeight = rows * effectiveHeight + (rows - 1) * verticalSpacingPx;
        
        // 根据对齐方式计算调整后的边距，确保四周都有页边距
        let adjustedHorizontalMargin, adjustedVerticalMargin;
        // 计算可用空间（减去四周的页边距）
        const availableWidth = paperWidth - 2 * marginPx;
        const availableHeight = paperHeight - 2 * marginPx;
        
        switch(selectedAlignment) {
            case 'center':
                // 居中对齐
                adjustedHorizontalMargin = marginPx + (availableWidth - totalWidth) / 2;
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'left':
                // 左对齐
                adjustedHorizontalMargin = marginPx; // 左侧留用户设置的页边距
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'right':
                // 右对齐
                adjustedHorizontalMargin = paperWidth - totalWidth - marginPx; // 右侧留用户设置的页边距
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'corner':
                // 角落对齐（左上角）
                adjustedHorizontalMargin = marginPx; // 左侧留用户设置的页边距
                adjustedVerticalMargin = marginPx; // 顶部留用户设置的页边距
                break;
            default:
                // 默认居中对齐
                adjustedHorizontalMargin = marginPx + (availableWidth - totalWidth) / 2;
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
        }
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // 计算照片的位置，考虑旋转后的实际尺寸和对齐方式
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
                
                // 绘制切割线（在照片下方和右侧）
                ctx.strokeStyle = '#ccc';
                ctx.lineWidth = 0.5;
                
                // 右侧切割线
                ctx.beginPath();
                ctx.moveTo(x + effectiveWidth, y);
                ctx.lineTo(x + effectiveWidth, y + effectiveHeight);
                ctx.stroke();
                
                // 下方切割线
                ctx.beginPath();
                ctx.moveTo(x, y + effectiveHeight);
                ctx.lineTo(x + effectiveWidth, y + effectiveHeight);
                ctx.stroke();
            }
        }
    }
    
    drawPhotos();
    
    // 绘制贯穿整个纸张的切割线
    function drawCuttingLines() {
        // 获取切割线设置
        const showCuttingLines = document.getElementById('showCuttingLines').checked;
        if (!showCuttingLines) return;
        
        // 获取切割线颜色
        const cuttingLineColor = document.getElementById('cuttingLineColor').value;
        ctx.strokeStyle = cuttingLineColor;
        ctx.lineWidth = 0.5;
        
        // 获取切割线调整值（以照片边缘为基线）
        const cuttingLineHorizontalAdjust = parseInt(document.getElementById('cuttingLineHorizontal').value);
        const cuttingLineVerticalAdjust = parseInt(document.getElementById('cuttingLineVertical').value);
        const cuttingLineSpacing = parseInt(document.getElementById('cuttingLineSpacing').value);
        const cuttingLineHorizontalAdjustPx = mmToPx(cuttingLineHorizontalAdjust);
        const cuttingLineVerticalAdjustPx = mmToPx(cuttingLineVerticalAdjust);
        const cuttingLineSpacingPx = mmToPx(cuttingLineSpacing);
        
        // 计算照片间距（使用用户设置的水平和垂直间距）
        const horizontalSpacingValue = parseInt(horizontalSpacing.value);
        const verticalSpacingValue = parseInt(verticalSpacing.value);
        const horizontalSpacingPx = mmToPx(horizontalSpacingValue);
        const verticalSpacingPx = mmToPx(verticalSpacingValue);
        
        // 计算照片的实际尺寸（考虑旋转后的最大占用空间）
        const photoWidthPx = mmToPx(photoDimensions[0]);
        const photoHeightPx = mmToPx(photoDimensions[1]);
        
        // 计算旋转后照片的最大占用空间（使用外接矩形的尺寸）
        const angle = rotation % 360;
        let effectiveWidth, effectiveHeight;
        
        if (angle === 90 || angle === 270) {
            // 横向照片，交换宽高
            effectiveWidth = photoHeightPx;
            effectiveHeight = photoWidthPx;
        } else {
            // 纵向照片，保持原宽高
            effectiveWidth = photoWidthPx;
            effectiveHeight = photoHeightPx;
        }
        
        // 获取对齐方式和页边距
        const selectedAlignment = alignment.value;
        const selectedMargin = parseInt(margin.value);
        const marginPx = mmToPx(selectedMargin);
        
        // 重新计算总宽度和高度（使用用户设置的间距）
        const totalWidth = cols * effectiveWidth + (cols - 1) * horizontalSpacingPx;
        const totalHeight = rows * effectiveHeight + (rows - 1) * verticalSpacingPx;
        
        // 根据对齐方式计算调整后的边距，确保四周都有页边距
        let adjustedHorizontalMargin, adjustedVerticalMargin;
        // 计算可用空间（减去四周的页边距）
        const availableWidth = paperWidth - 2 * marginPx;
        const availableHeight = paperHeight - 2 * marginPx;
        
        switch(selectedAlignment) {
            case 'center':
                // 居中对齐
                adjustedHorizontalMargin = marginPx + (availableWidth - totalWidth) / 2;
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'left':
                // 左对齐
                adjustedHorizontalMargin = marginPx; // 左侧留用户设置的页边距
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'right':
                // 右对齐
                adjustedHorizontalMargin = paperWidth - totalWidth - marginPx; // 右侧留用户设置的页边距
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
                break;
            case 'corner':
                // 角落对齐（左上角）
                adjustedHorizontalMargin = marginPx; // 左侧留用户设置的页边距
                adjustedVerticalMargin = marginPx; // 顶部留用户设置的页边距
                break;
            default:
                // 默认居中对齐
                adjustedHorizontalMargin = marginPx + (availableWidth - totalWidth) / 2;
                adjustedVerticalMargin = marginPx + (availableHeight - totalHeight) / 2;
        }
        
        // 收集所有切割线位置，确保以每张照片的四个边缘为基线
        const verticalLines = new Set();
        const horizontalLines = new Set();
        
        // 遍历每张照片，计算其四个边缘的位置
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                // 计算照片位置
                const photoX = adjustedHorizontalMargin + col * (effectiveWidth + horizontalSpacingPx);
                const photoY = adjustedVerticalMargin + row * (effectiveHeight + verticalSpacingPx);
                
                // 计算照片四个边缘的位置，考虑切割线调整
                // 这些边缘位置将作为切割线的基线
                const leftEdge = photoX + cuttingLineHorizontalAdjustPx;
                const rightEdge = photoX + effectiveWidth + cuttingLineHorizontalAdjustPx;
                const topEdge = photoY + cuttingLineVerticalAdjustPx;
                const bottomEdge = photoY + effectiveHeight + cuttingLineVerticalAdjustPx;
                
                // 添加到切割线集合中
                verticalLines.add(leftEdge);
                verticalLines.add(rightEdge);
                horizontalLines.add(topEdge);
                horizontalLines.add(bottomEdge);
            }
        }
        
        // 绘制垂直切割线（贯穿整个纸张高度）
        verticalLines.forEach(x => {
            // 绘制两条平行的切割线，形成间距
            ctx.beginPath();
            ctx.moveTo(x - cuttingLineSpacingPx / 2, 0);
            ctx.lineTo(x - cuttingLineSpacingPx / 2, paperHeight);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(x + cuttingLineSpacingPx / 2, 0);
            ctx.lineTo(x + cuttingLineSpacingPx / 2, paperHeight);
            ctx.stroke();
        });
        
        // 绘制水平切割线（贯穿整个纸张宽度）
        horizontalLines.forEach(y => {
            // 绘制两条平行的切割线，形成间距
            ctx.beginPath();
            ctx.moveTo(0, y - cuttingLineSpacingPx / 2);
            ctx.lineTo(paperWidth, y - cuttingLineSpacingPx / 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, y + cuttingLineSpacingPx / 2);
            ctx.lineTo(paperWidth, y + cuttingLineSpacingPx / 2);
            ctx.stroke();
        });
    }
    
    drawCuttingLines();
    
    // 启用下载和打印按钮
    downloadBtn.disabled = false;
    printBtn.disabled = false;
}

// 生成排版按钮点击事件
generateBtn.addEventListener('click', generateLayout);

// 实时浏览功能 - 当参数变化时自动更新排版
function setupRealTimePreview() {
    const elementsToWatch = [photoSize, paperSize, layout, colsInput, rowsInput, horizontalSpacing, verticalSpacing, alignment, margin, document.getElementById('showCuttingLines'), document.getElementById('cuttingLineColor'), document.getElementById('cuttingLineHorizontal'), document.getElementById('cuttingLineVertical'), document.getElementById('cuttingLineSpacing')];
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