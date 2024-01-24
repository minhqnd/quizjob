import json

# get the data from file cauhoi.txt
with open("cauhoi.txt", "r", encoding="utf-8") as f:
    data = f.read()

# Tách câu hỏi và đáp án
questions_and_answers = [qa.strip() for qa in data.split('\n') if qa.strip()]

# Khởi tạo danh sách chứa câu trả lời
json_data = []

# Biến lưu trữ thông tin câu hỏi hiện tại
current_question = None

# Lặp qua danh sách câu hỏi và đáp án
for qa in questions_and_answers:
    if qa.startswith("Câu"):
        # Nếu là câu hỏi mới, cập nhật current_question
        current_question = {"noidung": qa.split(".", 1)[1].strip(), "dapan": {}}
    elif qa.startswith("Đáp án"):
        # Nếu là đáp án, thêm vào current_question và thêm vào danh sách json_data
        current_question["dapandung"] = qa.split(" ")[2].strip()
        json_data.append(current_question)
    else:
        # Nếu là lựa chọn đáp án, thêm vào current_question
        option, content = qa.split(")", 1)
        current_question["dapan"][option.strip()] = content.strip()

# Chuyển đổi danh sách json_data thành định dạng JSON
json_output = json.dumps({"cauhoi": json_data}, ensure_ascii=False, indent=4)

# In kết quả
print(json_output)

#export to file json {"cauhoi": "json_output}
with open("cauhoi.json", "w", encoding="utf-8") as f:
    f.write(json_output)
    
    
