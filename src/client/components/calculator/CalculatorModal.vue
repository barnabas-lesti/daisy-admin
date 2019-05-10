<template>
	<div class="CalculatorModal">
		<div class="CalculatorModal_content">
			LoremIpse
		</div>
	</div>
</template>

<script>
export default {
	name: 'CalculatorModal',
};
</script>

<style lang="less">
.CalculatorModal {
	@_overlayColor: rgba(0, 0, 0, 0.5);
	@_contentBgColor: #ffffff;

	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background-color: @_overlayColor;

	&_content {
		background-color: @_contentBgColor;
		width: 50rem;
		margin: 10rem auto;
		padding: 1rem;
		border-radius: 4px;
	}
}
</style>
