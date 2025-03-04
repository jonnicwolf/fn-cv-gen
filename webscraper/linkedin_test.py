from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configure Chrome options
options = Options()
options.add_argument("--headless")  # Runs Chrome in headless mode
options.add_argument("--disable-blink-features=AutomationControlled")  # Helps avoid bot detection
options.add_argument("start-maximized")

driver = webdriver.Chrome()

try:
  driver.get("https://linkedin.com/jobs/view/4174479341/")
  
  job_desc = WebDriverWait(driver, 10).until(
      EC.presence_of_element_located((By.CLASS_NAME, "jobs-description__container"))
  )
  print("Job Description:\n", job_desc.text)

except Exception as e:
  print("Error:", e)

finally:
  driver.quit()
