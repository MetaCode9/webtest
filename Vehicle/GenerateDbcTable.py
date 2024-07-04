#
# Create DBC C language table
#
# https://www.metacode9.com
#
# 2024.05.21
# ( Created with Google gemini )
# ######################################
#
# * Usage example
# 1) Set OUTPUT_FILE_NAME
# 2) Drag the DBC file to this file. 
#     ( dbc file example : "exam.dbc" )
#

import cantools
import sys, os

OUTFILE_NAME = "can_dbc_table.c"


def dbc_to_c_table(dbc_file, output_file):
    db = cantools.database.load_file(dbc_file)

    with open(output_file, "w") as f:
        f.write("// Generated from DBC file: {}\n\n".format(dbc_file))

        # 메시지 ID 테이블 생성
        f.write("typedef struct {\n")
        f.write("    uint32_t id;\n")
        f.write("    const char *name;\n")
        f.write("} can_message_id_t;\n\n")
        # 메시지 ID 테이블 생성
        f.write("const can_message_id_t can_message_ids[] = {\n")
        for msg in db.messages:
            f.write(f"    {{0x{msg.frame_id:X}, \"{msg.name}\"}},\n")  # f-string 사용
        f.write("};\n\n")

        # 시그널 정보 테이블 생성
        f.write("typedef struct {\n")
        f.write("    uint32_t id;\n")
        f.write("    const char *name;\n")
        f.write("    uint8_t start_bit;\n")
        f.write("    uint8_t length;\n")
        f.write("    float factor;\n")
        f.write("    float offset;\n")
        f.write("} can_signal_t;\n\n")

        # 시그널 정보 테이블 생성
        f.write("const can_signal_t can_signals[] = {\n")
        for msg in db.messages:
            for sig in msg.signals:
                f.write(f"    {{0x{msg.frame_id:X}, \"{sig.name}\", {sig.start}, {sig.length}, {sig.scale}, {sig.offset}}},\n")  # f-string 사용
        f.write("};\n")


def log_message(ERR_MSG):
    print(ERR_MSG)

if len(sys.argv) != 2:
    log_message("Input : dbc file")
    sys.exit()

dbc_file_path = sys.argv[1]         # argv[0]: 실행 스크립트 경로, argv[1]: 첫번째 인자, ..
if os.path.isfile(dbc_file_path) == False:
    log_message( dbc_file_path + " file is not exist." )
    sys.exit()


dbc_to_c_table(dbc_file_path, OUTFILE_NAME)
