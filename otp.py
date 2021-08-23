import time
from smsactivateru import Sms, SmsTypes, SmsService, GetBalance, GetFreeSlots, GetNumber, SetStatus, GetStatus

"""
create wrapper with secret api-key
search here: http://sms-activate.ru/index.php?act=profile)
"""
wrapper = Sms('0cbAdd399d52bc494b84b56bc57cf276')


def get_number():
	# getting balance
	balance = GetBalance().request(wrapper)
	# show balance
	# print('On account {} руб.'.format(balance))
	# getting free slots (count available phone numbers for each services)
	available_phones = GetFreeSlots(
		country=SmsTypes.Country.US
	).request(wrapper)
	# show for vk.com, whatsapp and youla.io)
	# print('Yahoo: {} rooms'.format(available_phones.Yahoo.count))
	# print('Microsoft: {} rooms'.format(available_phones.Microsoft.count))
	# print('Instagram: {} rooms'.format(available_phones.Instagram.count))

	# try get phone for youla.io
	activation = GetNumber(
		service=SmsService().Microsoft,
		country=SmsTypes.Country.RU,
		operator=SmsTypes.Operator.Beeline
	).request(wrapper)
	# show activation id and phone for reception sms
	print('id: {} phone: {}'.format(str(activation.id), str(activation.phone_number)))

	# L = []
	# L.append(activation)
	# L.append(activation.id)
	# L.append(activation.phone_number)

	# # Writing to file
	# with open("userPhone.txt", "w") as file1:
	# 	# Writing data to a file
	# 	file1.writelines(L)

	return activation


def Otp(activation):

	# getting and show current activation status
	response = GetStatus(id=activation.id).request(wrapper)
	print(response)

	# .. send phone number to you service
	user_action = input('Press enter if you sms was sent or type "cancel": ')
	if user_action == 'cancel':
		set_as_cancel = SetStatus(
			id=activation.id,
			status=SmsTypes.Status.Cancel
		).request(wrapper)
		print(set_as_cancel)
		exit(1)

	# set current activation status as SmsSent (code was sent to phone)
	set_as_sent = SetStatus(
		id=activation.id,
		status=SmsTypes.Status.SmsSent
	).request(wrapper)
	print(set_as_sent)

	# .. wait code
	while True:
		time.sleep(1)
		response = GetStatus(id=activation.id).request(wrapper)
		if response['code']:
			print('Your code:{}'.format(response['code']))
			break

	# set current activation status as End (you got code and it was right)
	set_as_end = SetStatus(
		id=activation.id,
		status=SmsTypes.Status.End
	).request(wrapper)
	print(set_as_end)

	return response['code']


def main_func():
	activation = get_number()
	print(activation.phone_number[1:])
	otp = Otp(activation)
	return otp

if __name__=='__main__':
    # otp = main_func()
    number= get_number()
    print(number.phone_number)