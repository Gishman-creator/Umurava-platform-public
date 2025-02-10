import dropbox

# Replace with your Dropbox access token
ACCESS_TOKEN = 'sl.u.AFjDOeTbQk10CWTBpSxD3_8ahNcr2cPj5P_Z6k6e05cGvf0aQhHkYZ-7e1z8YkRXp_5pheaNN1uK9gwyQUHJcKHWiC0Uwhu5iHyaRDVZKvjosJKLvrt3Cr87HX5azcIksEl6TuDD1TQHQut37C9pEDe8dHEFZnYRiUAwaLo6LQa2ARBty_gwq28UpoH0mmolpEh1bGzvP9C_YjZeq1l6z-y9NCmltJcJea6F-lc0kWnTVRCXw4meUQRkAqDrYPBK7KW5RpsvS3YRSiP9O7TM_iLTbFmHTujh9CVO0kIiMgb5ZqQjQZcS13N1_ovGX0_l7safY22EoniEChRM4Ryg4Wk6gMZMOJR__NGQc1Il9VErk76nHDxDlF_dV8Y5JmnLoEfrLj7pvdFoRfTlY5M8zf99c4XKxSaQPXf_7dkxJOvfzQ1Wn_DB25p1VzLHeXbWNa55lbUmemfTjYM0XT8gvxFacpwYS_OVYZ8q8FlXD1eunGkEAVZVBs2-qgI3aRBcE5EQ6Xxvvo7_ZFxKwL302xlDPHcOWCkUH_iXtt0RgIroO1JVDK5a6KW1QpCqPbkeNW55WkyK51xl_hNtWPKGk4VJQTiVcZgNU3N3eG_gZqvQxAuH1X6iHNJLoQ0xPwbaRDz_C7ePNtq65F3ImMQPj_2GqJ5AOlQKZzDVxWcgjU9Ud_W1QuYjmrRnFev9fTpcRxWANbcQQcx-S20fJvYMI03b5DVvPlh96HoOQlrMkYofCn7SPTe4kST5YKBbRMS379JFypNnIkZZsZRvoL-SDhTNnPxvC3bW8uwnPPjiQrbNEcxN84jl8Iu2LW7LA1N_fLsRYPL7RpILW95Qsra7c1oTRKhCmLBttxYd47SOdcGC22dmFl-iBKRxA5_BSk5FxGJmasK57UZbqdF-mlO3wW4ehi9HwO_zWUx4LaDIhu7bZspBYm_d2Eus9XjKIMcsPaPVNSIS3EXYthyuXGAzNchUgSOvJeNvMEcGWfW2qF4NdAesNseEHkwWEA3JsCL4AwPIL8x4PyuCq-UZJRT_mnUVASLuufwHDs8d3XtYXp2BhOZbYLfXB4cT7MwSKXOQbHR1MQx7Mrj6OzjHwxzYgWYQaMMyz4AY0JmvcbGH3i6pUpsumfqYepkIFhClJepHpHMZGIMaROdKQghKtHGmNNuq3fjcEop23d2bNy-aYn_dYXgqBBX0oBgK25KleFfZcfD8ZWpmlqcPfNSfKZmRz4_87YOZXPrsXiU4yAsQEzNuP3u23TXGl2ZYKkxj0xKPLc8ZJUDmtRXsXs5st3Ii-06UDie5Bk5A2VicXJOLVk5lVhoGnndf9CcaNrt50G8i88mIvU-s_3TntdnV7DAYLhlh9f-v08K4X7EOLur1KyKfuUR-55KYdUMtRAFyGvBQ8XVN2DBMQOdF5f153q2SwOk1'

# Path in Dropbox where images will be uploaded
DROPBOX_FOLDER = '/ANbi6ek89HMlLAN0PteptsQ'

def upload_image(file_path):
    dbx = dropbox.Dropbox(ACCESS_TOKEN)
    
    with open(file_path, 'rb') as f:
        file_name = file_path.split('/')[-1]
        dropbox_path = f'{DROPBOX_FOLDER}/{file_name}'
        
        try:
            dbx.files_upload(f.read(), dropbox_path)
            print(f'Successfully uploaded {file_name} to {dropbox_path}')
        except Exception as e:
            print(f'Error uploading {file_name}: {e}')

if __name__ == '__main__':
    # Replace with the path to your image file
    image_path = '1738685736413-5abac6dc-c8da-41a1-8a51-51647c4248a6.jpeg'
    upload_image(image_path)
